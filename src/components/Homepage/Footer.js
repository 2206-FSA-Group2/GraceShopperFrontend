import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="container my-5" style={{bottom: "0", position: "fixed"}}>
        <footer
          className="text-center text-white"
          style={{backgroundColor: "#f1f1f1", left: "0", width: "100%",  position: "fixed", bottom: "0"}}
        >
          <div className="container pt-4" >
            <section className="mb-4" style={{height: "30px"}}>
              <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="https://www.facebook.com/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="https://twitter.com/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i className="fab fa-twitter"></i>
              </a>

              <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="https://www.google.com/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i className="fab fa-google"></i>
              </a>

              <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="https://www.instagram.com/"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i className="fab fa-instagram"></i>
              </a>

              <a
                className="btn btn-link btn-floating btn-lg text-dark m-1"
                href="https://github.com/orgs/2206-FSA-Group2/dashboard"
                role="button"
                data-mdb-ripple-color="dark"
              >
                <i className="fab fa-github"></i>
              </a>
            </section>
          </div>

          <div
            className="text-center text-light p-3"
            style={{backgroundColor: "black"}}
          >
            © 2022 Copyright:
              NAME TO BE DEFINED
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
