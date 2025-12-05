"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import "./style.css";

// ---------- TEAMS ----------
const teamsData = {
  // SECTION 001
  "Art & Sons Design": [
    "Owen Hollinger",
    "Maren Jensen",
    "Ella Needham",
    "John Nehls",
    "Drew Sonderman",
  ],
  "Avalon Salon": [
    "Lilian Chang",
    "Melissa Flores",
    "Hayley Krause",
    "Abby Needham",
    "Jiahui Shen",
  ],
  "Girl Scouts of Wisconsin": [
    "Katie Gaslow",
    "Bridget Helland",
    "Avianna Meder",
    "Hillary Shirley",
    "Ethan Siczkowycz",
    "Jaden Young",
  ],
  "Hey Hey Vacay": [
    "Yasir Baig",
    "Elaina DeBord",
    "Shane Fisher",
    "Dylan Krage",
    "Jesse Wild",
    "Cooper Zielke",
  ],
  "UW Book Store": [
    "Lucas Blair",
    "Annabella Kennedy",
    "Rolando Rodriguez-Wilson",
    "Daniella (Dani) Sananes",
    "Maxwell Schmidt",
    "Preston Wateska",
  ],
  "Hill Electric": [
    "Dylan Goodman",
    "Madeline Haug",
    "Laurel Miller",
    "Emma Schrei",
  ],
  "Milwaukee Tool": [
    "Christian Garcia",
    "Hope Pelland",
    "Sam Pincus",
    "Tatum Schaff",
    "Amir Sedik",
    "Micah Wilson",
  ],
  "Schweid & Sons": [
    "Casey Ascencio Munoz",
    "Benji Blair",
    "Luna Larson",
    "Lena Shi",
    "Jenna Victor",
    "Tyler Voss",
  ],
  "Z Boutique": [
    "Bryce Dailey",
    "Sunny Ganchan",
    "Cat Harrison",
    "Mara Holmes",
    "Leah Kennedy",
  ],

  // SECTION 002
  "Sober Social Club Bottle Shop": [
    "Liv O'Neil",
    "Madison Rosenberg",
    "Ben Schneider",
    "Sam Sielaff",
    "Choua Yang",
    "Tanner Ziese",
  ],
  "Auburn Ridge Cabinets": [
    "Amelia Darrah",
    "Yasmin Garcia Zalapa",
    "Ann (Annie) Hammel",
    "Calli Haus",
    "Ann Kuo",
  ],
  "Universal Home Protection": [
    "Morgan Desens",
    "Luke Garrett",
    "Julianna Kass",
    "Joey Okla",
    "Jamison Rudie",
    "Maren Wegley",
  ],
  "Union Cab": [
    "Chloe Altman",
    "Samantha Homme",
    "Alex Jacoboski",
    "Hannah Keener",
    "Tong Vue",
    "Reilly West",
  ],
  "Maize": [
    "Matthew Angsiwapong",
    "Mira Borglin",
    "Kaelee Hahn",
    "Kilee Knapp",
    "Aanya Rathod",
    "Drew Van Wie",
  ],
  "Spray-Net": [
    "Annabel Allen",
    "Ilana Goldklang",
    "Macy Hall",
    "Emma Rush",
    "Riley Sass",
    "Thomas Van Handel",
  ],
  "Keva Sports": [
    "Alex Alvarez",
    "Greg Dekker",
    "Arielle Herz",
    "Lillian Megan",
    "Carly Miller",
    "Drew Wegert",
  ],
  "Blain’s Farm & Fleet": [
    "Jenna Cairns",
    "Henri Clarke",
    "Betsy Fries",
    "Maddie Poor",
    "Lydia Stolman",
    "Colin Terpstra",
  ],
  "Culver’s": [
    "Ella Bradley",
    "Katelyn Kolhoff",
    "Jayden Rosenthal",
    "William Rutkowski",
    "Cooper Shelton",
  ],
  "Boneyard": [
    "Aylin Curtis",
    "Lucy Gonzalez",
    "Sean Harper",
    "Joslyn Oakley",
    "Ben Vigran",
  ],

  // SECTION 003
  "Arizona River Runners": [
    "Riley Del Percio",
    "Paige Olson",
    "Mikaela Snitzer",
    "Maya Stagman",
    "Kathryn Stearns",
    "Kelly Qi Ye",
  ],
  "White House Historical Association": [
    "Chloe Caravaj",
    "Julia DiDomizio",
    "Claire Patrow",
    "Elizabeth Schutz",
    "Vee Sridhar",
    "Sophia Swenson",
  ],
  "Revolve Cycle Studio": [
    "Stella Kim",
    "Danny Nguyen",
    "Madeline Setliff",
    "Eva Silver",
    "Remy Waldman",
    "Zach Walsh",
  ],
  "Madison Food Pantry Garden": [
    "Jake Bloomberg",
    "Carson Hill",
    "Ellie Livermore",
    "Anne Rewey",
    "Alex Shellow",
    "Iris Teharne-Jones",
  ],
  "Prime IV Hydration": [
    "Justin Buchbinder",
    "Danielle Kovel",
    "Eli Kroskin",
    "Maya Levine",
    "Caris Mullen",
    "Aidan Rindfleisch",
  ],
  "Tecovas": [
    "Maeve Condon",
    "Brendan Cucuzza",
    "Nataly Enerson",
    "Ethan Kessler",
    "Haley Slate",
    "Preet Talwar",
  ],
  "Ace Hardware": [
    "Emma Gubin",
    "Marissa Isaacs",
    "Kat Kessler",
    "Julia Ross",
    "Meg Simonte",
    "Audrey Soderlund",
  ],
  "Swiss Colony": [
    "Eliza Darling",
    "Matthew Granoff",
    "Lucy Kennedy",
    "Pieter Mulder",
    "Lilly Phan",
    "Dylen Shany",
  ],
  "Transformation Center": [
    "Hailey Bruder",
    "Avery Frank",
    "Adrian Jauregui",
    "Yuchen Qian",
    "Ella Rigby",
    "Holly Strang",
  ],
  "Windsor Breads and Bakery": [
    "Henry Hansen",
    "Joseph Bonnie",
    "Lily Shen",
    "Eliza Pappas",
    "Frankie Rosenberg",
    "Zachary Rosenberg",
  ],
};

// ---------- QUESTIONS CONFIG ----------
const overallQuestion = {
  id: "overall",
  label:
    "On a 1 to 10 scale (lowest performance = 1, highest performance = 10), what was this team member's overall contribution to the team for the entire semester? *",
  minLabel: "Lowest",
  maxLabel: "Highest",
  min: 1,
  max: 10,
};

const reflectionQuestion = {
  id: "reflection",
  label:
    "Thinking back to your rating for this team member for the in-semester evaluation from a few weeks ago, is this score intended to reflect: *",
  bullets: [
    "1 = materially lower scoring than mid-semester evaluation",
    "2 = slightly lower scoring than mid-semester evaluation",
    "3 = similar scoring to mid-semester evaluation",
    "4 = slightly better scoring than mid-semester evaluation",
    "5 = materially higher scoring than mid-semester evaluation",
  ],
  options: [
    { value: 1, label: "1: materially lower" },
    { value: 2, label: "2: slightly lower" },
    { value: 3, label: "3: similar" },
    { value: 4, label: "4: slightly higher" },
    { value: 5, label: "5: materially higher" },
  ],
};

const commentQuestion = {
  id: "comment",
  label:
    "Please comment on your evaluation relative to mid-semester, especially if your evaluation was for a materially lower or materially higher score (if similar scoring to mid-semester, no comments necessary).",
};

// ---------- GOOGLE APPS SCRIPT ENDPOINT ----------
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwdgXKOjC32AJZ0K_xQMy0e4WF9siY7MCBvupC30iXbCGOM9KF7YN9fQidpSNgdHXiXgA/exec";

// ---------- UTILITIES ----------
function range(max, start = 1) {
  const out = [];
  for (let i = start; i <= max; i++) out.push(i);
  return out;
}

function radioName(memberIdx, qid) {
  return `m${memberIdx + 1}_${qid}`;
}

// ---------- COMPONENT ----------
export default function PeerEvaluationForm() {
  const formRef = useRef(null);

  const [email, setEmail] = useState("");
  const [yourName, setYourName] = useState("");
  const [team, setTeam] = useState("");
  const members = useMemo(() => (team ? teamsData[team] || [] : []), [team]);

  const [ratings, setRatings] = useState({});
  const [freeText, setFreeText] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!team) {
      setRatings({});
      setFreeText({});
      return;
    }
    const initRatings = {};
    const initFree = {};
    (teamsData[team] || []).forEach((member) => {
      initRatings[member] = {};
      initFree[member] = {};
    });
    setRatings(initRatings);
    setFreeText(initFree);
  }, [team]);

  const handleRadio = (member, qid, value) => {
    setRatings((prev) => ({
      ...prev,
      [member]: { ...(prev[member] || {}), [qid]: value },
    }));
  };

  const handleText = (member, field, value) => {
    setFreeText((prev) => ({
      ...prev,
      [member]: { ...(prev[member] || {}), [field]: value },
    }));
  };
  function isWiscEmail(email) {
    return /^[A-Za-z0-9._%+-]+@wisc\.edu$/i.test(email);
  }

  const validate = () => {
    if ( !email || !yourName || !team ) return false;
   
    return members.every((m) => {
      const r = ratings?.[m] || {};
      const hasOverall = !!r[overallQuestion.id];
      const hasReflection = !!r[reflectionQuestion.id];
      return hasOverall && hasReflection;
    });
  };

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
    setEmail("");
    setYourName("");
    setTeam("");
    setRatings({});
    setFreeText({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading( true )
    console.log('email', email)
    if (!isWiscEmail(email))
      {
      alert(
        "Please use wisc.edu id"
      );
      setLoading(false)
      return;
    };
    if (!validate()) {
      alert(
        "Please complete all fields: email, your name, team, the 1 to 10 overall rating and the 1 to 5 comparison rating for each member."
      );
      setLoading(false)
      return;
    }

    const params = new URLSearchParams();
    params.set("email", email);
    params.set("submittedBy", yourName);
    params.set("team", team);
    params.set("timestamp", new Date().toISOString());

    members.forEach((member, idx) => {
      const i = idx + 1;
      params.set(`member${i}_name`, member);

      const r = ratings?.[member] || {};
      const overallVal = r[overallQuestion.id];
      const reflVal = r[reflectionQuestion.id];

      if (overallVal != null) {
        params.set(`member${i}_${overallQuestion.id}`, String(overallVal));
      }
      if (reflVal != null) {
        params.set(`member${i}_${reflectionQuestion.id}`, String(reflVal));
      }

      const free = freeText?.[member] || {};
      params.set(
        `member${i}_${commentQuestion.id}`,
        free[commentQuestion.id] || ""
      );
    });

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const text = await res.text();
      alert(text || "Submitted successfully!");
      resetForm();
      setLoading(false)
    } catch (err) {
      console.error(err);
      alert( "Error submitting the form. Please try again." );
      setLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>Peer Evaluation</h1>
      <p className="subtitle">
        Please rate all of your team members, including yourself.
      </p>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="grid">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@wisc.edu"
              className="input"
            />
          </div>

          <div className="field">
            <label>Your Name</label>
            <input
              type="text"
              required
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="First Last"
              className="input"
            />
          </div>

          <div className="field" style={{ gridColumn: "1 / -1" }}>
            <label>Select Team</label>
            <select
              required
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="input"
            >
              <option value="">Select Team</option>
              {Object.keys(teamsData).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!!members.length && (
          <div>
            {members.map((member, mIdx) => (
              <section key={member} className="member-card">
                <div className="member-header">
                  <h2 className="member-name">{member}</h2>
                  <span className="member-index">Member {mIdx + 1}</span>
                </div>

                {/* Overall 1 to 10 rating */}
                <div className="question-block">
                  <p className="question-title">
                    On a 1 to 10 scale, what was this team member&apos;s overall
                    contribution for the semester? *
                  </p>

                  <div className="radio-row">
                    {/* lowest label next to 1 */}
                    <span className="scale-min">{overallQuestion.minLabel}</span>

                    {range(overallQuestion.max, overallQuestion.min).map(
                      (val, iIdx) => (
                        <label
                          key={`${member}-overall-${val}`}
                          className="radio-item"
                        >
                          <input
                            type="radio"
                            name={radioName(mIdx, overallQuestion.id)}
                            value={val}
                            checked={
                              ratings?.[member]?.[overallQuestion.id] === val
                            }
                            onChange={() =>
                              handleRadio(member, overallQuestion.id, val)
                            }
                            required={iIdx === 0}
                          />
                          <span>{val}</span>

                          {val === overallQuestion.max && (
                            <span className="scale-max">
                              {overallQuestion.maxLabel}
                            </span>
                          )}
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Mid-semester comparison */}
                <div className="question-block">
                  <p className="question-title">
                    {reflectionQuestion.label}
                  </p>

                  <div className="reflection-desc">
                    {reflectionQuestion.bullets.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>

                  <div className="reflection-list">
                    {reflectionQuestion.options.map((opt, idx) => (
                      <label
                        key={`${member}-reflection-${opt.value}`}
                        className="reflection-item"
                      >
                        <input
                          type="radio"
                          name={radioName(mIdx, reflectionQuestion.id)}
                          value={opt.value}
                          checked={
                            ratings?.[member]?.[reflectionQuestion.id] ===
                            opt.value
                          }
                          onChange={() =>
                            handleRadio(
                              member,
                              reflectionQuestion.id,
                              opt.value
                            )
                          }
                          required={idx === 0}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Comment not required */}
                <div className="question-block">
                  <p className="question-title">{commentQuestion.label}</p>
                  <textarea
                    className="comment-box"
                    rows={4}
                    value={freeText?.[member]?.[commentQuestion.id] || ""}
                    onChange={(e) =>
                      handleText(member, commentQuestion.id, e.target.value)
                    }
                  />
                </div>
              </section>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={!!loading}>
          Submit
        </button>
      </form>
    </div>
  );
}
