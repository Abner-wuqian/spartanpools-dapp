import React from "react";

import { Link } from "react-router-dom";

// Import menuDropdown
import LanguageDropdown from "../Common/LanguageDropdown";

import logoLight from "../../assets/images/logo-light.png";
import logoLightSvg from "../../assets/images/icon-light.png";

//i18n
import { withNamespaces } from 'react-i18next';

//import components
import AddressConn from '../Common/AddressConn';
import ThemeSwitch from "../Common/ThemeSwitch";
//import ThemeSwitch from "../Common/ThemeSwitch";

const Header = (props) => {

  return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="pl-3 pr-1">
                <Link to="/" className="logo d-block d-sm-none">
                  <img src={logoLightSvg} alt="" height="40" />
                </Link>
                <Link to="/" className="logo d-none d-sm-block">
                  <img src={logoLight} alt="" height="55" />
                </Link>
              </div>

              <button
                  type="button"
                  className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                  onClick={props.toggleNav}
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>

            </div>

            <div className="d-flex">
            <ThemeSwitch className="d-flex" />
              <LanguageDropdown />
              <AddressConn />
            </div>
          </div>
        </header>
      </React.Fragment>
  );
}

export default (withNamespaces()(Header));