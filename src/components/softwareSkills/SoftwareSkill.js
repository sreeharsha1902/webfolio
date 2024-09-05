import React from "react";
import "./SoftwareSkill.scss";
import {skillsSection} from "../../portfolio";
import GraphQLLogo from "../../assets/images/GraphQLLogo.svg";

export default function SoftwareSkill() {
  return (
    <div>
      <div className="software-skills-main-div">
        <ul className="dev-icons">
          {skillsSection.softwareSkills.map((skills, i) => {
            return (
              <li
                key={i}
                className="software-skill-inline"
                name={skills.skillName}
              >
                {/* Conditionally render SVG for GraphQL or use font-awesome class for others */}
                {skills.skillName === "graphql" ? (
                  <img
                    src={GraphQLLogo}
                    alt="GraphQL"
                    className="graphql-icon"
                  />
                ) : (
                  <i className={skills.fontAwesomeClassname}></i>
                )}
                <p>{skills.skillName}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
