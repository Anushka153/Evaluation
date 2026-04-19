'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import './style.css';

// ---------- CONFIG: TEAMS & QUESTIONS ----------
// ---------- CONFIG: TEAMS & QUESTIONS ----------
const teamsData = {
  // ----- SECTION 001 -----
  'Ace Hardware': [
    'Shelly Chang',
    'Audrey Friedman',
    'Harnoor Kaur',
    'Julia Mcsweeney',
    'Gaby Pan',
    'Annie Possehl',
  ],

  'Keller Williams – Mandel Group': [
    'Alex Alonso-Cuevas',
    'Zachary Clark',
    'Shannon Mcallister',
    'Sophia Stone',
    'Zihe Yu',
    'Ben Zeller',
  ],

  Maize: [
    'William Brown',
    'Anna Fahl',
    'Yessica Garcia',
    'Ryan Rasmussen',
    'Isha Touray',
    'Luke Violich Czinczoll',
  ],

  'Night Owl Support Services': [
    'Ethan Beit-Halachmy',
    'Audrey Danniger',
    'Oliver Killian',
    'Ava Moder',
    'Sydney Urben',
    'Ruby Wolfers',
  ],

  Tecovas: [
    'Matthew Johnson',
    'Ava Kersh',
    'Emily Nordhaus',
    'James Olejniczak',
    'Catherine Seward',
    'Thomas Stattine',
  ],

  'Universal Home Protection': [
    'Lila Cerrito',
    'Bryce Gamelin',
    'Luke Geary',
    'Lydia Mao',
    'Sophia Orwig',
    'Emmy Skogstad',
  ],

  'University Book Store': [
    'Ava Douglass',
    'Molly Gandler',
    'Tess Papageorge',
    'Stephania Rundall',
    'Katrina Silvers',
  ],

  'Urban Community Arts Network': [
    'Elena Greco',
    'Riley Magurany',
    'Samantha Merck',
    'Samantha Rathman',
    'Mandy Umpierre',
    'Autumn Windus',
  ],

  'Wade House': [
    'Camille Clark',
    'Alexandra Eisler',
    'Kaleb Frey',
    'Joel Lopez',
    'Andrew Mayhew',
    'Abby Nemergut',
  ],

  'Z Boutique': [
    'Trista Anderson',
    'Casey Coan',
    'Sasha Huehnerfuss',
    'Alexandria Kraimer',
    'Madison Timmerman',
    'Layla Ward',
  ],

  // ----- SECTION 002 -----
  Boneyard: [
    'Connell Mcgee',
    'Jackson Phillips',
    'Khin Myat Shin',
    'Regan Staudt',
    'Rene Varona',
    'Sarah Zhong',
  ],

  'Diamonds Doing Good': [
    'Rob Booker',
    'Jack Loyda',
    'Qingpeng Meng',
    'Delaney Pfeiffer',
    'Yiwen Ruan',
    'Mercy Salzwedel',
  ],

  'Milwaukee Tool': [
    'Tyson Dyck',
    'Haowei He',
    'Kai Heverly',
    'Alberto Lopez',
    'Jacob Schaefer',
    'Zhiyin Zheng',
  ],

  'Schweid & Sons': [
    'Roman Eisa',
    'Nataly Flores Macias',
    'Garrett Grassl',
    'Carter Johnson',
    'Cole Kampa',
  ],

  'Simpli Soda': [
    'Jaselle Campos',
    'Ruijia Chen',
    'Kyle Clabough',
    'Maile Cohen',
    'Samuel Groblewski',
    'Julia Spilling',
  ],

  'Spray Net': [
    'Hailey Burklund',
    'Jeff Dillon',
    'Joseph Palodichuk',
    'Lukas Schorr',
    'Anya Zydek',
  ],

  'State Farm': [
    'Andrew Chavez',
    'Ava Gauthier',
    'Adam Luo',
    'Zoe Lee',
    'Max Reinhardt',
    'Miller Solome',
  ],

  'Veridian Homes': [
    'Michael Angsiwapong',
    'Ben Dickson',
    'Sydney Gasmer',
    'Vesa Ljumani',
    'Stephanie Malagon',
    'Matthew Pouliot',
  ],
};

// ---------- QUESTIONS ----------
const overallQuestion = {
  id: 'overall',
  label:
    "On a 1 to 10 scale (lowest performance = 1, highest performance = 10), what was this team member's overall contribution to the team for the entire semester? *",
  minLabel: 'Lowest',
  maxLabel: 'Highest',
  min: 1,
  max: 10,
};

const reflectionQuestion = {
  id: 'reflection',
  label:
    'Thinking back to your rating for this team member for the in-semester evaluation from a few weeks ago, is this score intended to reflect: *',
  bullets: [
    '1 = materially lower scoring than mid-semester evaluation',
    '2 = slightly lower scoring than mid-semester evaluation',
    '3 = similar scoring to mid-semester evaluation',
    '4 = slightly better scoring than mid-semester evaluation',
    '5 = materially higher scoring than mid-semester evaluation',
  ],
  options: [
    { value: 1, label: '1: materially lower' },
    { value: 2, label: '2: slightly lower' },
    { value: 3, label: '3: similar' },
    { value: 4, label: '4: slightly higher' },
    { value: 5, label: '5: materially higher' },
  ],
};

const commentQuestion = {
  id: 'comment',
  label:
    'Please comment on your evaluation relative to mid-semester, especially if your evaluation was for a materially lower or materially higher score (if similar scoring to mid-semester, no comments necessary).',
};

// ---------- GOOGLE APPS SCRIPT ENDPOINT ----------
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwdgXKOjC32AJZ0K_xQMy0e4WF9siY7MCBvupC30iXbCGOM9KF7YN9fQidpSNgdHXiXgA/exec';

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

  const [email, setEmail] = useState('');
  const [yourName, setYourName] = useState('');
  const [team, setTeam] = useState('');
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
    if (!email || !yourName || !team) return false;

    return members.every((m) => {
      const r = ratings?.[m] || {};
      const hasOverall = !!r[overallQuestion.id];
      const hasReflection = !!r[reflectionQuestion.id];
      return hasOverall && hasReflection;
    });
  };

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
    setEmail('');
    setYourName('');
    setTeam('');
    setRatings({});
    setFreeText({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('email', email);
    if (!isWiscEmail(email)) {
      alert('Please use wisc.edu id');
      setLoading(false);
      return;
    }
    if (!validate()) {
      alert(
        'Please complete all fields: email, your name, team, the 1 to 10 overall rating and the 1 to 5 comparison rating for each member.'
      );
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();
    params.set('email', email);
    params.set('submittedBy', yourName);
    params.set('team', team);

    params.set('timestamp', new Date().toISOString());

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
        free[commentQuestion.id] || ''
      );
    });

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const text = await res.text();
      alert(text || 'Submitted successfully!');
      resetForm();
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert('Error submitting the form. Please try again.');
      setLoading(false);
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

          <div className="field" style={{ gridColumn: '1 / -1' }}>
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
                    <span className="scale-min">
                      {overallQuestion.minLabel}
                    </span>

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
                  <p className="question-title">{reflectionQuestion.label}</p>

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
                    value={freeText?.[member]?.[commentQuestion.id] || ''}
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
