import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Link, withPrefix, classNames } from "../utils";
import Action from "./Action";

function Header(props) {
  const header = props;
  return (
    <header id="masthead" className="site-header container ">
      <nav className="navbar container--lg" aria-label="Main Navigation">
        {header.logo ? (
          <div className="navbar__logo">
            <Link to={withPrefix("/")}>
              <img src={withPrefix(header.logo)} alt={header.logo_alt} />
            </Link>
          </div>
        ) : (
          <div className="navbar__title">
            <Link to={withPrefix("/")}>
              <div className="navbar__logo_alt">
                <span className="navbar-logo__title">{header.title}</span>
                <span className="navbar-logo__sign">{header.logo_alt}</span>
              </div>
            </Link>
          </div>
        )}
        {header.has_nav && (
          <React.Fragment>
            <button id="navbar__open" className="navbar__toggle js-nav-toggle">
              <span className="screen-reader-text">Open Menu</span>
              <span className="icon-menu" aria-hidden="true" />
            </button>
            <div className="navbar__menu-container">
              <div className="navbar__scroller">
                <button
                  id="navbar__close"
                  className="navbar__toggle js-nav-toggle"
                >
                  <span className="screen-reader-text">Close Menu</span>
                  <span className="icon-close" aria-hidden="true" />
                </button>
                <ul className="navbar__menu menu">
                  {_.map(header.nav_links, (action, action_idx) => {
                    let pageUrl = _.trim(
                      _.get(props, "pageContext.url", null),
                      "/"
                    );
                    let actionUrl = _.trim(_.get(action, "url", null), "/");
                    return (
                      <li
                        key={action_idx}
                        className={classNames("menu__item", {
                          "menu__item--current": pageUrl === actionUrl,
                          "menu__item--button":
                            _.get(action, "style", null) !== "link",
                        })}
                      >
                        <Action {...props} action={action} />
                      </li>
                    );
                  })}
                </ul>

                <div className="navbar__extra">
                  <a
                    href={`tel:${header.phone}`}
                    className="navbar__phone navbar__extra-item"
                  >
                    {header.phone}
                  </a>
                  <ul className="navbar__locales navbar__extra-item">
                    {header.locales.map((locale) => {
                      return (
                        <li key={locale} className="navbar__locales-item">
                          <Link
                            // to={`/${locale}${props.site.path}`}
                            to={
                              locale === "ru"
                                ? _.trim(props.site.path, "ruen/")
                                :  `/${locale}/${_.trim(props.site.path, "ruen/")}`
                            }
                          >
                            {locale}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Action
                    className="navbar__extra-item"
                    action={header.contact}
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </nav>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  logo: PropTypes.string,
  logo_alt: PropTypes.string,
  nav_links: PropTypes.array,
};

export default Header;
// export default class Header extends React.Component {

//     render() {
//         let header = this.props.header;
//         console.log(header, 'header')
//         return (
// <header id="masthead" className="site-header container">
//   <nav className="navbar" aria-label="Main Navigation">
//   {header.logo ? (
//     <div className="navbar__logo">
//       <Link to={withPrefix('/')}><img src={withPrefix(header.logo)} alt={header.logo_alt} /></Link>
//     </div>
//     ) :
//     <div className="navbar__title">
//       <Link to={withPrefix('/')}>
//         <div className="navbar__logo_alt">
//           <span className="navbar-logo__title">{header.title}</span>
//           <span className="navbar-logo__sign">{header.logo_alt}</span>
//         </div>
//         </Link>
//     </div>
//     }
//     {/* <div className="navbar__title">
//       <Link to={withPrefix('/')}>{header.title}</Link>
//     </div> */}
//     {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) && (<React.Fragment>
//     <button id="navbar__open" className="navbar__toggle js-nav-toggle"><span className="screen-reader-text">Open Menu</span><span className="icon-menu" aria-hidden="true" /></button>
//     <div className="navbar__menu-container">
//       <div className="navbar__scroller">
//         <button id="navbar__close" className="navbar__toggle js-nav-toggle"><span className="screen-reader-text">Close Menu</span><span className="icon-close" aria-hidden="true" /></button>
//         <ul className="navbar__menu menu">
//           {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null), (action, action_idx) => {
//               let pageUrl = _.trim(_.get(this.props, 'pageContext.url', null), '/');
//               let actionUrl = _.trim(_.get(action, 'url', null), '/');
//               return (
//               <li key={action_idx} className={classNames('menu__item', {'menu__item--current': pageUrl === actionUrl, 'menu__item--button': _.get(action, 'style', null) !== 'link'})}>
//                 <Action {...this.props} action={action} />
//               </li>
//               )
//           })}
//         </ul>
//       </div>
//     </div>
//     </React.Fragment>)}
//   </nav>
// </header>
//         );
//     }
// }
