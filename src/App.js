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
const questions = [
  {
    id: 'contributed',
    label: 'Contributed to the group as a whole (process & outcomes)',
    minLabel: 'DID NOT Meet Expectations',
    maxLabel: 'EXCEEDED Expectations',
    min: 1,
    max: 5,
  },
  {
    id: 'ideas',
    label:
      'Shared ideas and suggestions in Team sessions and Client meetings to make the project better',
    minLabel: 'DID NOT Meet Expectations',
    maxLabel: 'EXCEEDED Expectations',
    min: 1,
    max: 5,
  },
  {
    id: 'leadership',
    label:
      'Demonstrated Leadership within the Team at appropriate points in the project',
    minLabel: 'DID NOT Meet Expectations',
    maxLabel: 'EXCEEDED Expectations',
    min: 1,
    max: 5,
  },
  {
    id: 'workshare',
    label: 'Carried fair share of total project workload',
    minLabel: 'Did Not Meet Expectations',
    maxLabel: 'Exceeded Expectations',
    min: 1,
    max: 5,
  },
  {
    id: 'positivity',
    label:
      'Exhibited a positive, cooperative manner, especially under pressure',
    minLabel: 'Did Not Meet Expectations',
    maxLabel: 'Exceeded Expectations',
    min: 1,
    max: 5,
  },
];

const overallQuestion = {
  id: 'overall',
  label:
    'Please rate overall performance and contribution (1–10) for this member for the semester as a whole',
  minLabel: 'Lowest',
  maxLabel: 'Highest',
  min: 1,
  max: 10,
};

// ---------- GOOGLE APPS SCRIPT ENDPOINT ----------
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz0HB6JtiyRrpOnhaqcDXlUZb9W_VLrSUj0Qs2NWo1nSAgoies7c7QpzDNTfwHYQkMffg/exec';

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
    setEmail('');
    setYourName('');
    setTeam('');
    setRatings({});
    setFreeText({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert(
        'Please complete all fields: email, your name, team, all ratings (1–5 & 1–10), and all text boxes for each member.'
      );
      return;
    }

    const params = new URLSearchParams();
    params.set('email', email);
    params.set('submittedBy', yourName);
    params.set('team', team);

    // add timestamp in ISO-8601 (UTC)
    params.set('timestamp', new Date().toISOString());

    members.forEach((member, idx) => {
      const i = idx + 1;
      params.set(`member${i}_name`, member);

      questions.forEach((q) => {
        const v = ratings?.[member]?.[q.id];
        if (v != null) params.set(`member${i}_${q.id}`, String(v));
      });

      const ov = ratings?.[member]?.[overallQuestion.id];
      if (ov != null)
        params.set(`member${i}_${overallQuestion.id}`, String(ov));

      const free = freeText?.[member] || {};
      params.set(`member${i}_doneWell`, free.doneWell || '');
      params.set(`member${i}_improve`, free.improve || '');
      params.set(`member${i}_notes`, free.notes || '');
    });

    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      const text = await res.text();
      alert(text || 'Submitted successfully!');
      resetForm(); // fully clear UI and state
    } catch (err) {
      console.error(err);
      alert('Error submitting the form. Please try again.');
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

          <div className="field" style={{ gridColumn: '1/-1' }}>
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
                    value={freeText?.[member]?.doneWell || ''}
                    onChange={(e) =>
                      handleText(member, 'doneWell', e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>What could be improved by this team member?</label>
                  <textarea
                    required
                    rows={2}
                    value={freeText?.[member]?.improve || ''}
                    onChange={(e) =>
                      handleText(member, 'improve', e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>Is there anything else that we should know?</label>
                  <textarea
                    required
                    rows={2}
                    value={freeText?.[member]?.notes || ''}
                    onChange={(e) =>
                      handleText(member, 'notes', e.target.value)
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

// ---------- GOOGLE APPS SCRIPT ENDPOINT ----------
