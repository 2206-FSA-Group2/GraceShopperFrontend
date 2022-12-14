import React from "react";

const Footer = () => {
  return (
        <footer
          className="text-center text-white"
          style={{ left: "0", width: "100%", bottom: "0", right: "0"}}
        >
          <div style={{backgroundColor:'#45788C'}} >
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

          </div>

          <div
            className="text-center text-light p-3"
            style={{backgroundColor: "#004c4c", marginTop: "auto"}}
          >
            © 2022 Copyright:
              Obsol337
          </div>
        </footer>
  );
};

export default Footer;
