import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner";
import axios from "axios";
import generatePDF from '../../services/reportGenerator'
import {toast} from 'react-toastify'

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [select, setShowSelect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [category, setCategory] = useState('All');
  const [categoryData, setCategoryData] = useState([]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  // const profiles = useSelector(state=>state.profile.profiles)

  

  const limit = 6;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };



  useEffect(() => {
    let getProfiles = async () => {
      try {
        let res = await fetch(
          `/api/get-all-profiles?page=1&limit=${limit}&q=${query}`,
          config
        );
        const data = await res.json();
        console.log(data)
        setProfiles(data);
        setLoading(false);
        const total = res.headers.get("x-total-count");
        setPageCount(Math.ceil(total / limit));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    
    };

    getProfiles();

    // dispatch(getAllProfilesInitiate(limit))
  }, [dispatch, limit, query]);

  useEffect(()=>{

    let getCategory = async () => {
      try {
        let res = await axios.get(
          `/api/get-category?s=${category}`,
          config
        );
  
  
      setCategoryData(res.data)  
      } catch (error) {
        console.log(error);
    
      }

   };    
   getCategory()



  },[category])

  
  const fetchProfiles = async (currentPage) => {
    const res = await fetch(
      `/api/get-all-profiles?page=${currentPage}&limit=${limit}&q=${query}`,
      config
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    const currentPage = data.selected + 1;

    const newProfiles = await fetchProfiles(currentPage);
    setProfiles(newProfiles);
  };
  if (loading) {
    return <Spinner />;
  }




  const handlePdfSubmit = () =>{

     setShowSelect(false)
     setDisabled(true)
    

     if(categoryData.length===0){

      toast.error(' No records under that Category', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
     }
     else{
      generatePDF(categoryData)
    
     }
   
  }


  const assignColorToCategory = profile => {
    if (profile.category === "GeneralSupplies") {
      return " text-center p-3 mb-2 bg-success text-white";
    } else if (profile.category === "Software") {
      return " text-center p-3 mb-2 bg-warning text-dark";
    } else if (profile.category === "Hotel&Hospitality") {
      return " text-center p-3 mb-2 bg-light text-dark";
    }
  };
  return (
    <>
      <div className="container" style={{ marginTop: "-80px" }}>
        <div>
           <h2>Profiles</h2> 
           
              <button style={{marginRight:'15px'}} className="btn btn-success">
                <Link
                  to="/create-profile"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Create Profile
                </Link>
              </button>
          
            <button  onClick={()=>{
              setShowSelect(true)
              }} className={`btn btn-secondary ${disabled?null:'disabled'}`}>Generate PDF</button>
            <h4 style={{marginTop:'15px',marginBottom:'-10px', visibility:`${select?'visible':'hidden'}`}}>Select category</h4>
            <select  onChange={ e=>{
              setCategory(e.target.value)
              setDisabled(false)} }  style={{ marginTop:'10px', width:'190px'}}  className={`form-select form-select-lg mb-3 ${select?null:'hidden'} `} >
  <option selected>All</option>
  <option value="IT">IT </option>
  <option value="BuildingConstruction">Building&Construction</option>
  <option value="GeneralConsultancy">General Consultancy</option>
  <option value="HotelHospitality">Hotel&Hospitality</option>
  <option value="Software">Software</option>
  <option value="GeneralSupplies">General Supplies</option>
  <option value="Pharmaceutical">Pharmaceutical</option>
</select>
 <button onClick={handlePdfSubmit} style={{marginRight:'15px'}} className={`btn btn-dark ${select?null:'hidden'}`}>Generate report for {category}</button>
          
          <input
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            className="form-control"
            style={{
              marginTop: "-20px",
              width: "300px",
              display: "flex",
              margin: "0 72%",
            }}
            placeholder="search..."
          />

          <div style={{ alignItems: "center" }}>
            <div class="form-group"></div>
          </div>
          <hr />
        </div>

        <div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => {
                  return (
                    <tr key={profile._id}>
                      <td>
                        <Link
                          to={`/view-single-profile/${profile._id}`}
                          className="link-line"
                        >
                          {profile.companyName}
                        </Link>
                      </td>
                      <td>{profile.author}</td>
                      <td>{profile.phone}</td>
                      <td>{profile.email}</td>
                      <td>{profile.location}</td>
                      <td className={assignColorToCategory(profile) }> {profile.category}</td>
                      <td>
                        <Link
                          to={`/view-single-profile/${profile._id}`}
                          className="btn btn-info"
                          style={{ padding: "5px", width: "100px" }}
                        >
                          <span class="glyphicon glyphicon-search"></span>
                          Action
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              {" "}
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
          {profiles.length === 0 ? (
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              Nothing to show at the moment.
            </h2>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Profiles;
