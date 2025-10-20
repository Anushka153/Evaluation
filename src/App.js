"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import "./style.css";

// ---------- CONFIG: TEAMS & QUESTIONS ----------
// ---------- CONFIG: TEAMS & QUESTIONS ----------
const teamsData = {
  // ----- SECTION 001 -----
  "Art & Sons Design": [
    "Owen Hollinger",
    "Maren Jensen",
    "Ella Needham",
    "John Nehls",
    "Drew Sonderman"
  ],
  "Avalon Salon": [
    "Lilian Chang",
    "Melissa Flores",
    "Hayley Krause",
    "Abby Needham",
    "Jiahui Shen"
  ],
  "Girl Scouts of Wisconsin": [
    "Katie Gaslow",
    "Bridget Helland",
    "Avianna Meder",
    "Hillary Shirley",
    "Ethan Siczkowycz",
    "Jaden Young"
  ],
  "Hey Hey Vacay": [
    "Yasir Baig",
    "Elaina DeBord",
    "Shane Fisher",
    "Dylan Krage",
    "Jesse Wild",
    "Cooper Zielke"
  ],
  "UW Book Store": [
    "Lucas Blair",
    "Annabella Kennedy",
    "Rolando Rodriguez-Wilson",
    "Daniella (Dani) Sananes",
    "Maxwell Schmidt",
    "Preston Wateska"
  ],
  "Hill Electric": [
    "Dylan Goodman",
    "Madeline Haug",
    "Laurel Miller",
    "Emma Schrei"
  ],
  "Milwaukee Tool": [
    "Christian Garcia",
    "Hope Pelland",
    "Sam Pincus",
    "Tatum Schaff",
    "Amir Sedik",
    "Micah Wilson"
  ],
  "Schweid & Sons": [
    "Casey Ascencio Munoz",
    "Benji Blair",
    "Luna Larson",
    "Lena Shi",
    "Jenna Victor",
    "Tyler Voss"
  ],
  "Z Boutique": [
    "Bryce Dailey",
    "Sunny Ganchan",
    "Cat Harrison",
    "Mara Holmes",
    "Leah Kennedy"
  ],

  // ----- SECTION 002 -----
  "Sober Social Club Bottle Shop": [
    "Liv O'Neil",
    "Madison Rosenberg",
    "Ben Schneider",
    "Sam Sielaff",
    "Choua Yang",
    "Tanner Ziese"
  ],
  "Auburn Ridge Cabinets": [
    "Amelia Darrah",
    "Yasmin Garcia Zalapa",
    "Ann (Annie) Hammel",
    "Calli Haus",
    "Ann Kuo"
  ],
  "Universal Home Protection": [
    "Morgan Desens",
    "Luke Garrett",
    "Julianna Kass",
    "Joey Okla",
    "Jamison Rudie",
    "Maren Wegley"
  ],
  "Union Cab": [
    "Chloe Altman",
    "Samantha Homme",
    "Alex Jacoboski",
    "Hannah Keener",
    "Tong Vue",
    "Reilly West"
  ],
  "Maize": [
    "Matthew Angsiwapong",
    "Mira Borglin",
    "Kaelee Hahn",
    "Kilee Knapp",
    "Aanya Rathod",
    "Drew Van Wie"
  ],
  "Spray-Net": [
    "Annabel Allen",
    "Ilana Goldklang",
    "Macy Hall",
    "Emma Rush",
    "Riley Sass",
    "Thomas Van Handel"
  ],
  "Keva Sports": [
    "Alex Alvarez",
    "Greg Dekker",
    "Arielle Herz",
    "Lillian Megan",
    "Carly Miller",
    "Drew Wegert"
  ],
  "Blain’s Farm & Fleet": [
    "Jenna Cairns",
    "Henri Clarke",
    "Betsy Fries",
    "Maddie Poor",
    "Lydia Stolman",
    "Colin Terpstra"
  ],
  "Culver’s": [
    "Ella Bradley",
    "Katelyn Kolhoff",
    "Jayden Rosenthal",
    "William Rutkowski",
    "Cooper Shelton"
  ],
  "Boneyard": [
    "Aylin Curtis",
    "Lucy Gonzalez",
    "Sean Harper",
    "Joslyn Oakley",
    "Ben Vigran"
  ],

  // ----- SECTION 003 -----
  "Arizona River Runners": [
    "Riley Del Percio",
    "Paige Olson",
    "Mikaela Snitzer",
    "Maya Stagman",
    "Kathryn Stearns",
    "Kelly Qi Ye"
  ],
  "White House Historical Association": [
    "Chloe Caravaj",
    "Julia DiDomizio",
    "Claire Patrow",
    "Elizabeth Schutz",
    "Vee Sridhar",
    "Sophia Swenson"
  ],
  "Revolve Cycle Studio": [
    "Stella Kim",
    "Danny Nguyen",
    "Madeline Setliff",
    "Eva Silver",
    "Remy Waldman",
    "Zach Walsh"
  ],
  "Madison Food Pantry Garden": [
    "Jake Bloomberg",
    "Carson Hill",
    "Ellie Livermore",
    "Anne Rewey",
    "Alex Shellow",
    "Iris Teharne-Jones"
  ],
  "Prime IV Hydration": [
    "Justin Buchbinder",
    "Danielle Kovel",
    "Eli Kroskin",
    "Maya Levine",
    "Caris Mullen",
    "Aidan Rindfleisch"
  ],
  "Tecovas": [
    "Maeve Condon",
    "Brendan Cucuzza",
    "Nataly Enerson",
    "Ethan Kessler",
    "Haley Slate",
    "Preet Talwar"
  ],
  "Ace Hardware": [
    "Emma Gubin",
    "Marissa Isaacs",
    "Kat Kessler",
    "Julia Ross",
    "Meg Simonte",
    "Audrey Soderlund"
  ],
  "Swiss Colony": [
    "Eliza Darling",
    "Matthew Granoff",
    "Lucy Kennedy",
    "Pieter Mulder",
    "Lilly Phan",
    "Dylen Shany"
  ],
  "Transformation Center": [
    "Hailey Bruder",
    "Avery Frank",
    "Adrian Jauregui",
    "Yuchen Qian",
    "Ella Rigby",
    "Holly Strang"
  ],
  "Windsor Breads and Bakery": [
    "Henry Hansen",
    "Joseph Bonnie",
    "Lily Shen",
    "Eliza Pappas",
    "Frankie Rosenberg",
    "Zachary Rosenberg"
  ]
};


// ---------- QUESTIONS ----------
const questions = [
  {
    id: "contributed",
    label: "Contributed to the group as a whole (process & outcomes)",
    minLabel: "DID NOT Meet Expectations",
    maxLabel: "EXCEEDED Expectations",
    min: 1,
    max: 5,
  },
  {
    id: "ideas",
    label:
      "Shared ideas and suggestions in Team sessions and Client meetings to make the project better",
    minLabel: "DID NOT Meet Expectations",
    maxLabel: "EXCEEDED Expectations",
    min: 1,
    max: 5,
  },
  {
    id: "leadership",
    label:
      "Demonstrated Leadership within the Team at appropriate points in the project",
    minLabel: "DID NOT Meet Expectations",
    maxLabel: "EXCEEDED Expectations",
    min: 1,
    max: 5,
  },
  {
    id: "workshare",
    label: "Carried fair share of total project workload",
    minLabel: "Did Not Meet Expectations",
    maxLabel: "Exceeded Expectations",
    min: 1,
    max: 5,
  },
  {
    id: "positivity",
    label:
      "Exhibited a positive, cooperative manner, especially under pressure",
    minLabel: "Did Not Meet Expectations",
    maxLabel: "Exceeded Expectations",
    min: 1,
    max: 5,
  },
];

const overallQuestion = {
  id: "overall",
  label:
    "Please rate overall performance and contribution (1–10) for this member for the semester as a whole",
  minLabel: "Lowest",
  maxLabel: "Highest",
  min: 1,
  max: 10,
};

// ---------- GOOGLE APPS SCRIPT ENDPOINT ----------
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0HB6JtiyRrpOnhaqcDXlUZb9W_VLrSUj0Qs2NWo1nSAgoies7c7QpzDNTfwHYQkMffg/exec";

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

  const validate = () => {
    if (!email || !yourName || !team) return false;
    return members.every((m) => {
      const r = ratings?.[m] || {};
      const allRadios =
        questions.every((q) => r[q.id]) && r[overallQuestion.id];
      const t = freeText?.[m] || {};
      const allTexts = t.doneWell && t.improve && t.notes;
      return allRadios && allTexts;
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
    if (!validate()) {
      alert(
        "Please complete all fields: email, your name, team, all ratings (1–5 & 1–10), and all text boxes for each member."
      );
      return;
    }

    const params = new URLSearchParams();
    params.set("email", email);
    params.set("submittedBy", yourName);
    params.set("team", team);

    // add timestamp in ISO-8601 (UTC)
    params.set("timestamp", new Date().toISOString());

    members.forEach((member, idx) => {
      const i = idx + 1;
      params.set(`member${i}_name`, member);

      questions.forEach((q) => {
        const v = ratings?.[member]?.[q.id];
        if (v != null) params.set(`member${i}_${q.id}`, String(v));
      });

      const ov = ratings?.[member]?.[overallQuestion.id];
      if (ov != null) params.set(`member${i}_${overallQuestion.id}`, String(ov));

      const free = freeText?.[member] || {};
      params.set(`member${i}_doneWell`, free.doneWell || "");
      params.set(`member${i}_improve`, free.improve || "");
      params.set(`member${i}_notes`, free.notes || "");
    });

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const text = await res.text();
      alert(text || "Submitted successfully!");
      resetForm(); // fully clear UI and state
    } catch (err) {
      console.error(err);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Peer Evaluation</h1>
      <p className="subtitle">
        Rate <b>all members of your team</b> — self-ratings are allowed.
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

          <div className="field" style={{ gridColumn: "1/-1" }}>
            <label>Select Team</label>
            <select
              required
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="input"
            >
              <option value="">-- Select Team --</option>
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
              <section key={member} className="member-section">
                <div className="member-head">
                  <h2>{member}</h2>
                  <span className="hint">Member {mIdx + 1}</span>
                </div>

                {questions.map((q) => (
                  <div key={q.id} className="question">
                    <p className="q-label">{q.label}</p>
                    <div className="scale-range">
                      <span>{q.minLabel}</span>
                      <span>{q.maxLabel}</span>
                    </div>
                    <div className="scale">
                      {range(q.max, q.min).map((val, iIdx) => (
                        <label key={`${member}-${q.id}-${val}`}>
                          <input
                            type="radio"
                            name={radioName(mIdx, q.id)}
                            value={val}
                            checked={ratings?.[member]?.[q.id] === val}
                            onChange={() => handleRadio(member, q.id, val)}
                            required={iIdx === 0}
                          />
                          <span>{val}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="question">
                  <p className="q-label">{overallQuestion.label}</p>
                  <div className="scale-range">
                    <span>{overallQuestion.minLabel}</span>
                    <span>{overallQuestion.maxLabel}</span>
                  </div>
                  <div className="scale">
                    {range(overallQuestion.max, overallQuestion.min).map(
                      (val, iIdx) => (
                        <label key={`${member}-overall-${val}`}>
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
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="field">
                  <label>What was done well by this team member?</label>
                  <textarea
                    required
                    rows={2}
                    value={freeText?.[member]?.doneWell || ""}
                    onChange={(e) =>
                      handleText(member, "doneWell", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>What could be improved by this team member?</label>
                  <textarea
                    required
                    rows={2}
                    value={freeText?.[member]?.improve || ""}
                    onChange={(e) =>
                      handleText(member, "improve", e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Is there anything else that we should know?</label>
                  <textarea
                    required
                    rows={2}
                    value={freeText?.[member]?.notes || ""}
                    onChange={(e) =>
                      handleText(member, "notes", e.target.value)
                    }
                  />
                </div>
              </section>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
