import React, { Component } from 'react';
import './index.css';

class SpeechToText extends Component {
  state = {
    isListening: false,
    transcript: '',
    savedNotes: JSON.parse(localStorage.getItem('savedNotes')) || [],
    currentTitle: '',
    language: 'en-US',
    wordCount: 0,
    characterCount: 0,
    showStats: false,
    categories: ['Personal', 'Work', 'Study', 'Meeting'],
    selectedCategory: 'Personal'
  };

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

   // Add this method to save notes to localStorage whenever they change
   componentDidUpdate(prevProps, prevState) {
    if (prevState.savedNotes !== this.state.savedNotes) {
      localStorage.setItem('savedNotes', JSON.stringify(this.state.savedNotes));
    }
  }

  componentDidMount() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = this.state.language;

    this.recognition.onstart = () => {
      console.log('Recording started');
      this.setState({ isListening: true });
    };

    this.recognition.onend = () => {
      console.log('Recording ended');
      if (this.state.isListening) {
        this.recognition.start();
      }
    };

    this.recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      this.setState(prevState => ({
        transcript: transcript,
        wordCount: transcript.trim().split(/\s+/).length,
        characterCount: transcript.length
      }));
    };
  }

  toggleListening = () => {
    if (this.state.isListening) {
      this.recognition.stop();
      this.setState({ isListening: false });
    } else {
      this.recognition.start();
    }
  };

 
  saveNote = () => {
    if (this.state.transcript && this.state.currentTitle) {
      const newNote = {
        id: Date.now(), // Add unique ID for each note
        title: this.state.currentTitle,
        content: this.state.transcript,
        date: new Date().toLocaleString(),
        category: this.state.selectedCategory,
        wordCount: this.state.wordCount,
        characterCount: this.state.characterCount
      };
      
      this.setState(prevState => ({
        savedNotes: [...prevState.savedNotes, newNote],
        transcript: '',
        currentTitle: '',
        wordCount: 0,
        characterCount: 0
      }));
    }
  };

  deleteNote = (index) => {
    this.setState(prevState => ({
      savedNotes: prevState.savedNotes.filter((_, i) => i !== index)
    }));
  };

  render() {
    const { 
      isListening, 
      transcript, 
      savedNotes, 
      currentTitle, 
      wordCount, 
      characterCount, 
      showStats,
      categories,
      selectedCategory 
    } = this.state;

    return (
      <div className="speech-container">
        <header className="speech-header">
          <h1>Voice Notes Pro</h1>
          <p className="subtitle">Transform your voice into text instantly</p>
        </header>

        <div className="main-content">
          <div className="control-panel">
            <div className="input-group">
              <input
                type="text"
                className="title-input"
                placeholder="Enter note title..."
                value={currentTitle}
                onChange={(e) => this.setState({ currentTitle: e.target.value })}
              />
              <select 
                value={selectedCategory}
                onChange={(e) => this.setState({ selectedCategory: e.target.value })}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="button-group">
              <button 
                className={`record-button ${isListening ? 'recording' : ''}`}
                onClick={this.toggleListening}
              >
                {isListening ? 'Stop Recording' : 'Start Recording'}
                <span className="record-icon"></span>
              </button>
              <button 
                className="save-button"
                onClick={this.saveNote}
                disabled={!transcript || !currentTitle}
              >
                Save Note
              </button>
            </div>
          </div>

          <div className="transcript-section">
            <div className="transcript-box">
              <textarea
                value={transcript}
                onChange={(e) => this.setState({ 
                  transcript: e.target.value,
                  wordCount: e.target.value.trim().split(/\s+/).length,
                  characterCount: e.target.value.length
                })}
                placeholder="Your speech will appear here..."
                readOnly={isListening}
              />
            </div>
            
            <div className="stats-panel">
              <button 
                className="stats-toggle"
                onClick={() => this.setState(prev => ({ showStats: !prev.showStats }))}
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </button>
              {showStats && (
                <div className="stats">
                  <p>Words: {wordCount}</p>
                  <p>Characters: {characterCount}</p>
                </div>
              )}
            </div>
          </div>

          <div className="saved-notes">
            <h3>Saved Notes</h3>
            <div className="notes-grid">
              {savedNotes.map((note, index) => (
                <div key={index} className="note-card">
                  <div className="note-header">
                    <h4>{note.title}</h4>
                    <span className="category-tag">{note.category}</span>
                  </div>
                  <p>{note.content}</p>
                  <div className="note-footer">
                    <small>{note.date}</small>
                    <button 
                      className="delete-button"
                      onClick={() => this.deleteNote(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpeechToText;
