"use client";

import React, { useState } from "react";

const teamsData = {
  "Team Alpha": ["Alice", "Bob", "Charlie", "David", "Eve"],
  "Team Beta": ["Frank", "Grace", "Hank", "Ivy"],
  "Team Gamma": ["Kim", "Liam", "Mia", "Noah", "Olivia"],
};

const evaluationParams = ["Collaboration", "Communication", "Technical"];

const App = () => {
  const [submittedBy, setSubmittedBy] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [evaluations, setEvaluations] = useState([]);

  const handleTeamChange = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);
    setSelectedMembers(Array(teamsData[team]?.length).fill(""));
    setEvaluations(
      Array(teamsData[team]?.length).fill({
        collaboration: "",
        communication: "",
        technical: "",
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!submittedBy) {
      alert("Please enter your name before submitting.");
      return;
    }

      const url =
      "https://script.google.com/macros/s/AKfycbyQYyM0MEpOPaCnAIjdmqVtyL0gR7WIW3pQZZcft0J9_-2O7C72H42GK3JDeW1c6Rr-8g/exec";
    const body = new URLSearchParams({
      submittedBy,
      team: selectedTeam,
      ...selectedMembers.reduce((acc, member, i) => {
        acc[`member${i + 1}`] = member;
        acc[`collab${i + 1}`] = evaluations[i].collaboration;
        acc[`comm${i + 1}`] = evaluations[i].communication;
        acc[`tech${i + 1}`] = evaluations[i].technical;
        return acc;
      }, {}),
    }).toString();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
      .then((res) => res.text())
      .then((data) => alert(data))
      .catch((error) => console.error("Error submitting form:", error));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", width: "400px" }}>
        <h2 style={{ textAlign: "center" }}>Team Evaluation</h2>
        <form onSubmit={handleSubmit}>
          <label>Submitted By</label>
          <input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} placeholder="Enter your name" style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} required />

          <label>Select Team</label>
          <select value={selectedTeam} onChange={handleTeamChange} style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} required>
            <option value="">-- Select Team --</option>
            {Object.keys(teamsData).map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>

          {selectedMembers.map((_, index) => {
            const availableMembers = teamsData[selectedTeam]?.filter((member) => !selectedMembers.includes(member) || selectedMembers[index] === member) || [];
            return (
              <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
                <label>Team Member {index + 1}</label>
                <select value={selectedMembers[index]} onChange={(e) => {
                  const updatedMembers = [...selectedMembers];
                  updatedMembers[index] = e.target.value;
                  setSelectedMembers(updatedMembers);
                }} style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }}>
                  <option value="">-- Select Member --</option>
                  {availableMembers.map((member) => (
                    <option key={member} value={member}>{member}</option>
                  ))}
                </select>
                {evaluationParams.map((param) => (
                  <div key={param}>
                    <label>{param}</label>
                    <input type="text" placeholder={`Rate ${param}`} value={evaluations[index][param.toLowerCase().replace(" ", "")]} onChange={(e) => {
                      const updatedEvaluations = [...evaluations];
                      updatedEvaluations[index] = { ...updatedEvaluations[index], [param.toLowerCase().replace(" ", "")]: e.target.value };
                      setEvaluations(updatedEvaluations);
                    }} style={{ width: "100%", padding: "8px", margin: "5px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
                  </div>
                ))}
              </div>
            );
          })}
          <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default App;
