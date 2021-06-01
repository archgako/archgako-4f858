import React from "react";
import { Helmet } from "react-helmet";
import _ from "lodash";

import { withPrefix, attribute } from "../utils";
import "../sass/main.scss";
import Header from "./Header";
import Footer from "./Footer";

export default class Body extends React.Component {
  getLocale(path) {
    const LOCALES = {
      default: "ru",
      en: "en",
    };
    let locale = LOCALES.default;
    if (path.includes("/en/")) {
      locale = LOCALES.en;
    }
    return locale;
  }

  getLocaleData(locale, array) {
    let result = array.filter((item) => item.locale === locale);
    result = result[0];
    return result;
  }

  render() {
    const font =
      _.get(this.props, "pageContext.site.siteMetadata.base_font", null) ||
      "fraunces";

    const locale = this.getLocale(_.get(this.props, "path"));
    const siteMetadataLocales = _.get(
      this.props,
      "pageContext.site.siteMetadata.locales",
      null
    );
    const localeData = this.getLocaleData(locale, siteMetadataLocales);
    return (
      <>
        <Helmet>
          <title>
            {_.get(this.props, "pageContext.frontmatter.seo.title", null)
              ? _.get(this.props, "pageContext.frontmatter.seo.title", null)
              : `${_.get(
                  this.props,
                  "pageContext.frontmatter.title",
                  null
                )} | ${_.get(
                  this.props,
                  "pageContext.site.siteMetadata.title",
                  null
                )}`}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initialScale=1.0"
          />
          <meta name="google" content="notranslate" />
          <meta
            name="description"
            content={
              _.get(
                this.props,
                "pageContext.frontmatter.seo.description",
                null
              ) || ""
            }
          />
          {_.get(this.props, "pageContext.frontmatter.seo.robots", null) && (
            <meta
              name="robots"
              content={_.join(
                _.get(this.props, "pageContext.frontmatter.seo.robots", null),
                ","
              )}
            />
          )}
          {_.map(
            _.get(this.props, "pageContext.frontmatter.seo.extra", null),
            (meta, meta_idx) => {
              const key_name = _.get(meta, "keyName", null) || "name";
              return _.get(meta, "relativeUrl", null) ? (
                _.get(
                  this.props,
                  "pageContext.site.siteMetadata.domain",
                  null
                ) &&
                  (() => {
                    const domain = _.trim(
                      _.get(
                        this.props,
                        "pageContext.site.siteMetadata.domain",
                        null
                      ),
                      "/"
                    );
                    const rel_url = withPrefix(_.get(meta, "value", null));
                    const full_url = domain + rel_url;
                    return (
                      <meta
                        key={meta_idx}
                        {...attribute(key_name, _.get(meta, "name", null))}
                        content={full_url}
                      />
                    );
                  })()
              ) : (
                <meta
                  key={`${meta_idx}.1`}
                  {...attribute(key_name, _.get(meta, "name", null))}
                  content={_.get(meta, "value", null)}
                />
              );
            }
          )}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Arsenal:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          {_.get(this.props, "pageContext.site.siteMetadata.favicon", null) && (
            <link
              rel="icon"
              href={withPrefix(
                _.get(this.props, "pageContext.site.siteMetadata.favicon", null)
              )}
            />
          )}
          <body
            className={`font-${_.get(
              this.props,
              "pageContext.site.siteMetadata.base_font",
              null
            )} palette-${_.get(
              this.props,
              "pageContext.site.siteMetadata.color_scheme",
              null
            )} accent-${_.get(
              this.props,
              "pageContext.site.siteMetadata.accent_color",
              null
            )}`}
          />
        </Helmet>
        <div id="site-wrap" className="site">
          <Header {...localeData.header} />
          <main id="content" className="site-content">
            {this.props.children}
          </main>
          <Footer footer={localeData} />
        </div>
      </>
    );
  }
}
