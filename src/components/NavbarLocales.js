import React from "react";

const NavbarLocales = (props) => {
  return (
    <ul className="navbar__locales navbar__extra-item">
      {header.locales.map((locale) => {
        return (
          <li key={locale} className="navbar__locale">
            <Link to={`/${locale}${props.site.path}`}>{locale}</Link>
          </li>
        );
      })}
    </ul>
  );
};
