import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Spinner from "../common/Spinner";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // const profiles = useSelector(state=>state.profile.profiles)

  const limit = 3;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    let getProfiles = async () => {
      try {
        let res = await fetch(
          `/api/get-all-profiles?page=1&limit=${limit}`,
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
  }, [dispatch, limit]);
  const fetchProfiles = async (currentPage) => {
    const res = await fetch(
      `/api/get-all-profiles?page=${currentPage}&limit=${limit}`,
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

  return (
    <>
      <div className="container" style={{ marginTop: "-60px" }}>
        <div>
          <h2>
            Profiles
            <p>
              <Link
                to="/create-profile"
                className="btn btn-default float-right"
              >
                Create Profile
              </Link>
            </p>
          </h2>
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
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
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
                      <td>
                        <Link
                          to={`/view-single-profile/${profile._id}`}
                          className="btn btn-info"
                          style={{ padding: "5px", width: "100px" }}
                        >
                          <span class="glyphicon glyphicon-search"></span>
                          View
                        </Link>
                      </td>
                      <td>
                        <Link
                          class="glyphicon glyphicon-search"
                          to={`/view-single-profile/${profile._id}`}
                          className="btn btn-primary"
                          style={{ padding: "5px", width: "100px" }}
                        >
                          <span class="glyphicon glyphicon-edit"></span>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/view-single-profile/${profile._id}`}
                          className="btn btn-danger"
                          style={{ padding: "5px", width: "100px" }}
                        >
                          <span class="glyphicon glyphicon-remove"></span>
                          Delete
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
          {profiles.length===0?<h2 style={{display:'flex',justifyContent:'center' }}>Nothing to show at the moment.</h2>:null}
        </div>
      </div>
    </>
  );
};

export default Profiles;
