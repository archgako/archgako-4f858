import React from "react";
import _ from "lodash";
import { Link, markdownify } from "../utils";
import Icon from "./Icon";

export default class TeamMemberSection extends React.Component {
  render() {
    let section = _.get(this.props, "section", null);
    let photo_position = _.get(section, "photo_position", null);
    let bg_color = _.get(section, "bg_color", null);
    let photo_class_name = "team-member__photo";
    if (photo_position === "right")
      photo_class_name = photo_class_name + " team-member-img-bg_right";
    if (bg_color !== "brown")
      photo_class_name = photo_class_name + ` team-member-img-bg_${bg_color}`;
    console.log(section, "TEAM");
    return (
      <section
        id={_.get(section, "section_id", null)}
        className="section section--team-member"
      >
        <div className="container container--lg">
          <div
            className={
              photo_position === "right"
                ? "team-member team-member_img-right"
                : "team-member"
            }
          >
            <figure className={photo_class_name}>
                <div className="team-member__photo-bg"/>
              <img className="team-member__photo-photo"
                src={_.get(section, "photo", null)}
                alt={_.get(section, "name", null)}
                title={_.get(section, "name", null)}
              />
            </figure>

            <div className="team-member__info">
              <div className="team-member__title-wrapper">
                <h3 className="team-member__name">
                  {_.get(section, "name", null)}
                </h3>
                <ul className="team-member__professions">
                  {_.get(section, "professions", null).map((profession, index) => {
                    return (
                      <li
                        key={profession + index}
                        className="team-member__professions-item"
                      >
                        {profession}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <ul className="team-member__education">
                {_.get(section, "education", null).map((education, index) => {
                  return (
                    <li key={education + index} className="team-member__education_item">
                      {education}
                    </li>
                  );
                })}
              </ul>
              <ul className="team-member__contacts">
                <li className="team-member__contacts-item team-member__inst">
                    <Icon icon="instagram" />
                  <Link to={`https://www.instagram.com/${_.get(section, "instagram", null)}`}> @{_.get(section, "instagram", null)}</Link>
                </li>
                <li className="team-member__contacts-item team-member__phones">
                <Icon icon="phone"/>
                    <div className="team-member__phones-wrapper">
                        {_.get(section, 'phones', null).map(item => {
                            return <a key={item.phone} href={`tel:${item.phone}`} className="team-member__phones-item">{item.phone} <span className="accent">{item.locale}</span></a>
                        })}
                        
                    </div>

                </li>
              </ul>
            </div>
          </div>
          <div className="section__body team-member__content">{markdownify(_.get(section, "content", null))}</div>
        </div>
      </section>
    );
  }
}
