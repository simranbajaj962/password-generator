import { useState } from "react";
import { generate } from "@wcj/generate-password";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const [passOpts, setPassOpts] = useState({
    length: 5,
    upperCase: true,
    lowerCase: true,
    numeric: false,
    special: false,
  });

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  function handleCopy() {
    copyTextToClipboard(password)
      .then(() => {
        setCopy(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleGeneratePass() {
    setCopy(false);
    setPassword(generate(passOpts));
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="container-header">Password Generator</h2>
        <div className="container-pass">
          <h3>{password}</h3>
          <button onClick={handleCopy} className="copy-btn">
            {copy ? (
              <i className="fa-solid fa-check"></i>
            ) : (
              <i className="far fa-clipboard"></i>
            )}
          </button>
        </div>
        <div className="form-group form-char-length">
          <div className="char-length-header">
            <p>Character Length</p>
            <p>{passOpts.length}</p>
          </div>
          <div className="slider_container">
            <input
              className="range"
              value={passOpts.length}
              onChange={(e) =>
                setPassOpts({ ...passOpts, length: e.target.value })
              }
              type="range"
              max={20}
              min={8}
              id="pass-length"
            />
          </div>
        </div>
        <div className="form-group">
          <input
            checked={passOpts.upperCase}
            onChange={() =>
              setPassOpts({ ...passOpts, upperCase: !passOpts.upperCase })
            }
            type="checkbox"
            id="upperCase"
          />
          <label htmlFor="upperCase">Include Uppercase Letters</label>
        </div>
        <div className="form-group">
          <input
            checked={passOpts.lowerCase}
            onChange={() =>
              setPassOpts({ ...passOpts, lowerCase: !passOpts.lowerCase })
            }
            type="checkbox"
            id="lowerCase"
          />
          <label htmlFor="lowerCase">Include Lowercase Letters</label>
        </div>
        <div className="form-group">
          <input
            checked={passOpts.numeric}
            onChange={() =>
              setPassOpts({ ...passOpts, numeric: !passOpts.numeric })
            }
            type="checkbox"
            id="numeric"
          />
          <label htmlFor="numeric">Include Numbers</label>
        </div>
        <div className="form-group">
          <input
            checked={passOpts.special}
            onChange={() =>
              setPassOpts({ ...passOpts, special: !passOpts.special })
            }
            type="checkbox"
            id="special"
          />
          <label htmlFor="special">Include Symbols</label>
        </div>
        <button onClick={handleGeneratePass} className="generate-btn">
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
