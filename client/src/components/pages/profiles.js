import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner";
import axios from "axios";
import assignColorToCategory from "../../services/assignColor";
import generatePDF from "../../services/reportGenerator";
import { toast } from "react-toastify";
import Chart from "../../services/charGenerator";
import {AiFillFilePdf} from 'react-icons/ai';



const Profiles = () => {
  const initialCount = {
    software_count: 0,
    IT_count: 0,
    general_supplies_count: 0,
    pharm_count: 0,
    hotel_hospitality_count: 0,
    general_consultancy_count: 0,
    building_construction_count: 0,
  };

  const [profiles, setProfiles] = useState([]);
  const [limit, setLimit] = useState(3);
  const [profilesChart, setProfilesChart] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [select, setShowSelect] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [categoryCount, setCategoryCount] = useState(initialCount);
  const [category, setCategory] = useState("All");
  const [categoryData, setCategoryData] = useState([]);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    setCategoryCount({
      ...categoryCount,
      software_count: (
        (profilesChart.filter((profile) => profile.category === "Software")
          .length /
          profilesChart.length) *
        100
      ).toFixed(2),
      IT_count: (
        (profilesChart.filter((profile) => profile.category === "IT").length /
          profilesChart.length) *
        100
      ).toFixed(2),
      general_supplies_count: (
        (profiles.filter((profile) => profile.category === "GeneralSupplies")
          .length /
          profilesChart.length) *
        100
      ).toFixed(2),
      pharm_count: (
        (profilesChart.filter(
          (profile) => profile.category === "Pharmaceutical"
        ).length /
          profilesChart.length) *
        100
      ).toFixed(2),
      hotel_hospitality_count: (
        (profilesChart.filter(
          (profile) => profile.category === "HotelHospitality"
        ).length /
          profilesChart.length) *
        100
      ).toFixed(2),
      general_consultancy_count: (
        (profilesChart.filter(
          (profile) => profile.category === "GeneralConsultancy"
        ).length /
          profilesChart.length) *
        100
      ).toFixed(2),
      building_construction_count: (
        (profilesChart.filter(
          (profile) => profile.category === "BuildingConstruction"
        ).length /
          profilesChart.length) *
        100
      ).toFixed(2),
    });
  }, []);

  console.log(profilesChart.length);
  console.log(
    profilesChart.filter((profile) => profile.category === "HotelHospitality")
      .length
  );
  useEffect(() => {
    let getProfilesChart = async () => {
      try {
        let res = await fetch("/api/get-all-profiles", config);
        const data = await res.json();

        setProfilesChart(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfilesChart();
  }, [profilesChart]);

  useEffect(() => {
    let getProfiles = async () => {
      try {
        let res = await fetch(
          `/api/get-all-profiles?page=1&limit=${limit}&q=${query}`,
          config
        );
        const data = await res.json();

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

  useEffect(() => {
    let getCategory = async () => {
      try {
        let res = await axios.get(`/api/get-category?s=${category}`, config);

        setCategoryData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [category]);

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

  const handlePdfSubmit = () => {
    setShowSelect(false);
    setDisabled(true);

    if (categoryData.length === 0) {
      toast.error(" No records under that Category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      generatePDF(categoryData);
    }
  };

  return (
    <>
      <div className="container" style={{ marginTop: "-80px" }}>
        <div>
          <h2>Profiles</h2>

          <button style={{ marginRight: "15px" }} className="btn btn-success"><i className="fa fa-file-pdf-o" aria-hidden="true"></i>
            <Link
              to="/create-profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              Create Profile
            </Link>
          </button>

          <button
            onClick={() => {
              setShowSelect(true);
            }}
            className={`btn btn-secondary ${disabled ? null : "disabled"}`}
          >
            Generate PDF <AiFillFilePdf/>
          </button>

          <h4
            style={{
              marginTop: "15px",
              marginBottom: "-10px",
              visibility: `${select ? "visible" : "hidden"}`,
            }}
          >
            Select category
          </h4>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
              setDisabled(false);
            }}
            style={{ marginTop: "10px", width: "190px" }}
            className={`form-select form-select-lg mb-3 ${
              select ? null : "hidden"
            } `}
          >
            <option selected>All</option>
            <option value="IT">IT </option>
            <option value="BuildingConstruction">Building&Construction</option>
            <option value="GeneralConsultancy">General Consultancy</option>
            <option value="HotelHospitality">Hotel&Hospitality</option>
            <option value="Software">Software</option>
            <option value="GeneralSupplies">General Supplies</option>
            <option value="Pharmaceutical">Pharmaceutical</option>
          </select>
          <button
            onClick={handlePdfSubmit}
            style={{ marginRight: "15px" }}
            className={`btn btn-dark ${select ? null : "hidden"}`}
          >
            Generate report for {category}
          </button>

          <div style={{ alignItems: "center" }}></div>
        </div>
        <div>
          {" "}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "-50px",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                height: "25px",
                marginRight: "10px",
              }}
            >
              Show
            </p>
            <select
              onChange={(e) => {
                setLimit(e.target.value);
                setDisabled(false);
              }}
              style={{ marginTop: "10px", width: "50px", height: "30px" }}
              className="form-select form-select-lg mb-3"
            >
              <option selected>3</option>
              <option value={5}>5 </option>
              <option value={10}>10</option>
            </select>
            <p
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                height: "30px",
                marginLeft: "10px",
              }}
            >
              Entries
            </p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="form-control"
              placeholder="search..."
              style={{ width: "200px" }}
            />
          </div>
          <div
            style={{ border: "1px solid #eee" }}
            className="table-responsive"
          >
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
                      <td className={assignColorToCategory(profile)}>
                        {" "}
                        {profile.category}
                      </td>
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
          </div>
          {profiles.length === 0 ? (< div style={{ display: "flex", flexDirection:'column',justifyContent: "center" }}>
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              Nothing to show at the moment.
            </h2><button style={{ display: "flex",width:'80px', margin:'0 auto',justifyContent: "center" }} onClick={()=>window.location.reload()}>Refresh page</button></div>
          ) : null}
        </div>{" "}
        <div
          style={{
            marginTop: "-15px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
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

      <div
        style={{
          display: "flex",
          marginTop: "-45px",
          margin: "0 auto",
          width: "80%",
          height: "50%",
        }}
      >
        <Chart categoryCount={categoryCount} />
      </div>
    </>
  );
};

export default Profiles;
