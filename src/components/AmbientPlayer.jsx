import React, { useState, useEffect, useRef } from "react";
import { Music, Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";

export default function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [track, setTrack] = useState("acoustic"); // lofi, acoustic, kesariya, kabira, channamereya
  const [isMuted, setIsMuted] = useState(false);
  
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const gainNodeRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const activeSourcesRef = useRef([]);

  // Tracks listing
  const tracks = [
    { id: "lofi", name: "Synthesized Chill Lofi" },
    { id: "acoustic", name: "Aesthetic Acoustic Pad" },
    { id: "kesariya", name: "Kesariya Lofi (Arijit)" },
    { id: "kabira", name: "Kabira Lofi (Arijit/Tochi)" },
    { id: "channamereya", name: "Channa Mereya Lofi" }
  ];

  // Stop all active synthesized sounds
  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
      } catch (e) {}
    });
    activeSourcesRef.current = [];
  };

  // Initialize Web Audio API Synth Engine
  const startSynth = () => {
    stopSynth();

    // Create context if it doesn't exist
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    
    // Resume context if suspended
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Set up Analyser and Gain nodes
    if (!analyserRef.current) {
      analyserRef.current = ctx.createAnalyser();
      analyserRef.current.fftSize = 64;
    }
    
    if (!gainNodeRef.current) {
      gainNodeRef.current = ctx.createGain();
    }
    
    // Set robust audible volume
    gainNodeRef.current.gain.value = isMuted ? 0 : 0.6;

    // Connect nodes
    gainNodeRef.current.connect(analyserRef.current);
    analyserRef.current.connect(ctx.destination);

    // --- SYNTH TRACK ENGINES ---
    if (track === "lofi") {
      const chordProg = [
        [130.81, 155.56, 196.00, 233.08], // C3, Eb3, G3, Bb3
        [174.61, 207.65, 261.63, 311.13]  // F3, Ab3, C4, Eb4
      ];

      let chordIndex = 0;

      const playChord = () => {
        const chord = chordProg[chordIndex];
        const oscs = [];
        
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          
          localGain.gain.setValueAtTime(0, ctx.currentTime);
          localGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);
          localGain.gain.setValueAtTime(0.18, ctx.currentTime + 3.5);
          localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.8);
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          osc.start();
          osc.stop(ctx.currentTime + 6);
          oscs.push(osc);
        });

        // Soft crackling vinyl noise
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = "sawtooth";
        clickOsc.frequency.setValueAtTime(8, ctx.currentTime);
        clickGain.gain.setValueAtTime(0.015, ctx.currentTime);
        clickOsc.connect(clickGain);
        clickGain.connect(gainNodeRef.current);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 6);
        oscs.push(clickOsc);

        activeSourcesRef.current.push(...oscs);
        chordIndex = (chordIndex + 1) % chordProg.length;
      };

      playChord();
      synthIntervalRef.current = setInterval(playChord, 6000);

    } else if (track === "acoustic") {
      const chords = [
        [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
        [220.00, 261.63, 329.63, 440.00]  // A3, C4, E4, A4
      ];
      let chordIndex = 0;

      const playAcoustic = () => {
        const chord = chords[chordIndex];
        const oscs = [];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, ctx.currentTime);
          
          const delay = idx * 0.08;
          localGain.gain.setValueAtTime(0, ctx.currentTime + delay);
          localGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.5);
          localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 7.5);
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 8);
          oscs.push(osc);
        });

        activeSourcesRef.current.push(...oscs);
        chordIndex = (chordIndex + 1) % chords.length;
      };

      playAcoustic();
      synthIntervalRef.current = setInterval(playAcoustic, 8000);

    } else if (track === "kesariya") {
      const chordProg = [
        [146.83, 185.00, 220.00, 277.18], // D3, F#3, A3, C#4 (Dmaj7)
        [123.47, 146.83, 185.00, 220.00], // B2, D3, F#3, A3 (Bm7)
        [98.00, 123.47, 146.83, 185.00],  // G2, B2, D3, F#3 (Gmaj7)
        [110.00, 138.59, 164.81, 196.00]  // A2, C#3, E3, G3 (A7)
      ];

      const melodyNotes = [
        { time: 0.0, freq: 440.00 }, // A4
        { time: 0.3, freq: 493.88 }, // B4
        { time: 0.6, freq: 554.37 }, // C#5
        { time: 1.2, freq: 554.37 }, // C#5
        { time: 1.8, freq: 493.88 }, // B4
        { time: 2.1, freq: 440.00 }, // A4
        { time: 2.5, freq: 493.88 }, // B4
        { time: 2.9, freq: 440.00 }, // A4
        { time: 3.4, freq: 369.99 }, // F#4
        { time: 3.8, freq: 392.00 }, // G4

        { time: 4.8, freq: 440.00 }, // A4
        { time: 5.1, freq: 493.88 }, // B4
        { time: 5.4, freq: 554.37 }, // C#5
        { time: 6.0, freq: 554.37 }, // C#5
        { time: 6.6, freq: 493.88 }, // B4
        { time: 6.9, freq: 440.00 }, // A4
        { time: 7.2, freq: 392.00 }, // G4

        { time: 8.0, freq: 369.99 }, // F#4
        { time: 8.3, freq: 392.00 }, // G4
        { time: 8.7, freq: 440.00 }, // A4
        { time: 9.1, freq: 369.99 }, // F#4
        { time: 9.6, freq: 329.63 }, // E4
        { time: 10.0, freq: 293.66 }, // D4
        { time: 10.5, freq: 329.63 }, // E4
        { time: 11.0, freq: 293.66 }  // D4
      ];

      let loopCount = 0;

      const playSequence = () => {
        const oscs = [];
        
        const chord = chordProg[loopCount % chordProg.length];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.0, ctx.currentTime);
          
          const delay = idx * 0.15; 
          localGain.gain.setValueAtTime(0, ctx.currentTime + delay);
          localGain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + delay + 1.2);
          localGain.gain.setValueAtTime(0.16, ctx.currentTime + delay + 8.0);
          localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 11.5);
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 12);
          oscs.push(osc);
        });

        melodyNotes.forEach((note) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
          
          const vibrato = ctx.createOscillator();
          const vibratoGain = ctx.createGain();
          vibrato.frequency.value = 5.0; 
          vibratoGain.gain.value = 2.0; 
          
          vibrato.connect(vibratoGain);
          vibratoGain.connect(osc.frequency);
          
          const noteStart = ctx.currentTime + note.time;
          localGain.gain.setValueAtTime(0, noteStart);
          localGain.gain.linearRampToValueAtTime(0.15, noteStart + 0.08); 
          localGain.gain.setValueAtTime(0.15, noteStart + 0.3);
          localGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.42); 
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          vibrato.start(noteStart);
          osc.start(noteStart);
          
          vibrato.stop(noteStart + 0.45);
          osc.stop(noteStart + 0.45);
          
          oscs.push(osc, vibrato);
        });

        const kickBeats = [0.0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5];
        kickBeats.forEach((time) => {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          
          kickOsc.type = "sine";
          kickOsc.frequency.setValueAtTime(110, ctx.currentTime + time);
          kickOsc.frequency.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.2);
          
          kickGain.gain.setValueAtTime(0, ctx.currentTime + time);
          kickGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + time + 0.01);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.22);
          
          kickOsc.connect(kickGain);
          kickGain.connect(gainNodeRef.current);
          
          kickOsc.start(ctx.currentTime + time);
          kickOsc.stop(ctx.currentTime + time + 0.25);
          oscs.push(kickOsc);
        });

        const snareBeats = [0.75, 2.25, 3.75, 5.25, 6.75, 8.25, 9.75, 11.25];
        snareBeats.forEach((time) => {
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = noiseBuffer;
          
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1200;
          
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime + time);
          noiseGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + time + 0.01);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.1);
          
          noiseSource.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(gainNodeRef.current);
          
          noiseSource.start(ctx.currentTime + time);
          oscs.push(noiseSource);
        });

        activeSourcesRef.current.push(...oscs);
        loopCount++;
      };

      playSequence();
      synthIntervalRef.current = setInterval(playSequence, 12000);

    } else if (track === "kabira") {
      const chordProg = [
        [174.61, 220.00, 261.63, 329.63], // F3, A3, C4, E4
        [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
        [146.83, 174.61, 220.00, 261.63], // D3, F3, A3, C4
        [116.54, 146.83, 174.61, 220.00]  // Bb2, D3, F3, A3
      ];

      const melodyNotes = [
        { time: 0.0, freq: 440.00 }, // A4
        { time: 0.4, freq: 523.25 }, // C5
        { time: 0.8, freq: 523.25 }, // C5
        { time: 1.2, freq: 493.88 }, // B4
        { time: 1.8, freq: 440.00 }, // A4
        { time: 2.2, freq: 392.00 }, // G4

        { time: 3.0, freq: 392.00 }, // G4
        { time: 3.4, freq: 493.88 }, // B4
        { time: 3.8, freq: 493.88 }, // B4
        { time: 4.2, freq: 440.00 }, // A4
        { time: 4.8, freq: 392.00 }, // G4
        { time: 5.2, freq: 349.23 }, // F4

        { time: 6.0, freq: 392.00 }, // G4
        { time: 6.4, freq: 440.00 }, // A4
        { time: 6.8, freq: 349.23 }, // F4
        { time: 7.2, freq: 329.63 }, // E4
        { time: 7.6, freq: 293.66 }, // D4
        { time: 8.0, freq: 261.63 }, // C4
        { time: 8.4, freq: 293.66 }, // D4
        { time: 9.0, freq: 293.66 }, // D4
        { time: 9.4, freq: 329.63 }, // E4
        { time: 9.8, freq: 349.23 }  // F4
      ];

      let loopCount = 0;

      const playSequence = () => {
        const oscs = [];
        
        const chord = chordProg[loopCount % chordProg.length];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.0, ctx.currentTime);
          
          const delay = idx * 0.15; 
          localGain.gain.setValueAtTime(0, ctx.currentTime + delay);
          localGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + delay + 1.2);
          localGain.gain.setValueAtTime(0.15, ctx.currentTime + delay + 8.0);
          localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 11.5);
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 12);
          oscs.push(osc);
        });

        melodyNotes.forEach((note) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
          
          const vibrato = ctx.createOscillator();
          const vibratoGain = ctx.createGain();
          vibrato.frequency.value = 5.0; 
          vibratoGain.gain.value = 2.0; 
          
          vibrato.connect(vibratoGain);
          vibratoGain.connect(osc.frequency);
          
          const noteStart = ctx.currentTime + note.time;
          localGain.gain.setValueAtTime(0, noteStart);
          localGain.gain.linearRampToValueAtTime(0.15, noteStart + 0.08); 
          localGain.gain.setValueAtTime(0.15, noteStart + 0.3);
          localGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.42); 
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          vibrato.start(noteStart);
          osc.start(noteStart);
          
          vibrato.stop(noteStart + 0.45);
          osc.stop(noteStart + 0.45);
          
          oscs.push(osc, vibrato);
        });

        const kickBeats = [0.0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5];
        kickBeats.forEach((time) => {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          
          kickOsc.type = "sine";
          kickOsc.frequency.setValueAtTime(110, ctx.currentTime + time);
          kickOsc.frequency.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.2);
          
          kickGain.gain.setValueAtTime(0, ctx.currentTime + time);
          kickGain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + time + 0.01);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.22);
          
          kickOsc.connect(kickGain);
          kickGain.connect(gainNodeRef.current);
          
          kickOsc.start(ctx.currentTime + time);
          kickOsc.stop(ctx.currentTime + time + 0.25);
          oscs.push(kickOsc);
        });

        const snareBeats = [0.75, 2.25, 3.75, 5.25, 6.75, 8.25, 9.75, 11.25];
        snareBeats.forEach((time) => {
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = noiseBuffer;
          
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1200;
          
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime + time);
          noiseGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + time + 0.01);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.1);
          
          noiseSource.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(gainNodeRef.current);
          
          noiseSource.start(ctx.currentTime + time);
          oscs.push(noiseSource);
        });

        activeSourcesRef.current.push(...oscs);
        loopCount++;
      };

      playSequence();
      synthIntervalRef.current = setInterval(playSequence, 12000);

    } else if (track === "channamereya") {
      const chordProg = [
        [196.00, 233.08, 293.66, 392.00], // Gm
        [155.56, 196.00, 233.08, 311.13], // Eb
        [130.81, 155.56, 196.00, 261.63], // Cm
        [174.61, 220.00, 261.63, 349.23]  // F
      ];

      const melodyNotes = [
        { time: 0.0, freq: 293.66 }, // D4
        { time: 0.4, freq: 293.66 }, 
        { time: 0.8, freq: 311.13 }, // Eb4
        { time: 1.2, freq: 293.66 }, // D4
        
        { time: 2.0, freq: 261.63 }, // C4
        { time: 2.4, freq: 261.63 }, 
        { time: 2.8, freq: 293.66 }, // D4
        { time: 3.2, freq: 261.63 }, // C4
        
        { time: 4.0, freq: 233.08 }, // Bb3
        { time: 4.4, freq: 261.63 }, // C4
        { time: 4.8, freq: 233.08 }, // Bb3
        { time: 5.2, freq: 220.00 }, // A3
        
        { time: 6.0, freq: 233.08 }, // Bb3
        { time: 6.4, freq: 233.08 }, 
        { time: 6.8, freq: 261.63 }, // C4
        { time: 7.2, freq: 233.08 }, // Bb3
        { time: 7.6, freq: 220.00 }, // A3
        
        { time: 8.0, freq: 196.00 }, // G3
        { time: 8.4, freq: 220.00 }, // A3
        { time: 8.8, freq: 233.08 }, // Bb3
        { time: 9.2, freq: 220.00 }, // A3
        { time: 9.6, freq: 196.00 }, // G3
        { time: 10.0, freq: 185.00 }, // F#3
        { time: 10.4, freq: 196.00 }  // G3
      ];

      let loopCount = 0;

      const playSequence = () => {
        const oscs = [];
        
        // 1. Play background pad chord
        const chord = chordProg[loopCount % chordProg.length];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.2, ctx.currentTime);
          
          const delay = idx * 0.12; 
          localGain.gain.setValueAtTime(0, ctx.currentTime + delay);
          localGain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + delay + 1.0);
          localGain.gain.setValueAtTime(0.18, ctx.currentTime + delay + 8.0);
          localGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 11.5);
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          osc.start(ctx.currentTime + delay);
          osc.stop(ctx.currentTime + delay + 12);
          oscs.push(osc);
        });

        // 2. Play Channa Mereya melody
        melodyNotes.forEach((note) => {
          const osc = ctx.createOscillator();
          const localGain = ctx.createGain();
          
          osc.type = "triangle";
          osc.frequency.setValueAtTime(note.freq, ctx.currentTime + note.time);
          
          const vibrato = ctx.createOscillator();
          const vibratoGain = ctx.createGain();
          vibrato.frequency.value = 5.5; 
          vibratoGain.gain.value = 2.0; 
          
          vibrato.connect(vibratoGain);
          vibratoGain.connect(osc.frequency);
          
          const noteStart = ctx.currentTime + note.time;
          localGain.gain.setValueAtTime(0, noteStart);
          localGain.gain.linearRampToValueAtTime(0.2, noteStart + 0.08); 
          localGain.gain.setValueAtTime(0.2, noteStart + 0.28);
          localGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.38); 
          
          osc.connect(localGain);
          localGain.connect(gainNodeRef.current);
          
          vibrato.start(noteStart);
          osc.start(noteStart);
          
          vibrato.stop(noteStart + 0.4);
          osc.stop(noteStart + 0.4);
          
          oscs.push(osc, vibrato);
        });

        // 3. Play a lofi kick drum beat
        const kickBeats = [0.0, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5];
        kickBeats.forEach((time) => {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          
          kickOsc.type = "sine";
          kickOsc.frequency.setValueAtTime(120, ctx.currentTime + time);
          kickOsc.frequency.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + 0.2);
          
          kickGain.gain.setValueAtTime(0, ctx.currentTime + time);
          kickGain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + time + 0.01);
          kickGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.25);
          
          kickOsc.connect(kickGain);
          kickGain.connect(gainNodeRef.current);
          
          kickOsc.start(ctx.currentTime + time);
          kickOsc.stop(ctx.currentTime + time + 0.3);
          oscs.push(kickOsc);
        });

        // 4. Play a soft lofi snare/rimshot beat
        const snareBeats = [0.75, 2.25, 3.75, 5.25, 6.75, 8.25, 9.75, 11.25];
        snareBeats.forEach((time) => {
          const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.15, ctx.sampleRate);
          const output = noiseBuffer.getChannelData(0);
          for (let i = 0; i < noiseBuffer.length; i++) {
            output[i] = Math.random() * 2 - 1;
          }
          
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = noiseBuffer;
          
          const filter = ctx.createBiquadFilter();
          filter.type = "bandpass";
          filter.frequency.value = 1000;
          
          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime + time);
          noiseGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + time + 0.01);
          noiseGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + time + 0.12);
          
          noiseSource.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(gainNodeRef.current);
          
          noiseSource.start(ctx.currentTime + time);
          oscs.push(noiseSource);
        });

        activeSourcesRef.current.push(...oscs);
        loopCount++;
      };

      playSequence();
      synthIntervalRef.current = setInterval(playSequence, 12000);
    }
  };

  // Sync state changes
  useEffect(() => {
    if (isPlaying) {
      startSynth();
    } else {
      stopSynth();
    }
    return () => {
      stopSynth();
    };
  }, [isPlaying, track]);

  // Synchronous user click handlers to bypass auto-play restrictions
  const handlePlayPause = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (trackId) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
    
    setTrack(trackId);
    if (!isPlaying) setIsPlaying(true);
  };

  // Handle Mute
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : 0.6;
    }
  }, [isMuted]);

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    let animFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 60;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const renderVisuals = () => {
      animFrameId = requestAnimationFrame(renderVisuals);
      
      const width = canvas.width;
      const height = canvas.height;
      
      canvasCtx.clearRect(0, 0, width, height);

      if (isPlaying && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (width / bufferLength) * 1.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const percent = dataArray[i] / 255;
          const barHeight = percent * height * 0.8;

          const hue = (i / bufferLength) * 35 + 5; 
          canvasCtx.fillStyle = `hsla(${hue}, 80%, 78%, 0.95)`;
          canvasCtx.fillRect(x, height / 2 - barHeight / 2, barWidth - 2, barHeight);
          x += barWidth;
        }
      } else {
        canvasCtx.shadowBlur = 0;
        canvasCtx.strokeStyle = "rgba(127, 139, 110, 0.3)";
        canvasCtx.lineWidth = 1;
        canvasCtx.beginPath();
        canvasCtx.moveTo(0, height / 2);
        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
      }
    };

    renderVisuals();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isPlaying, track]);

  // Clean up completely on unmount
  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="ambient-player-panel glass-card">
      <div className="player-meta">
        <div className="flex-row-center gap-2">
          <Music className={`music-note-icon ${isPlaying ? "spin-music" : ""}`} size={20} />
          <div>
            <h4 className="no-margin font-mono">Live Music & Ambience</h4>
            <span className="text-muted text-xs">Simulating Acoustic, Lofi, Kesariya, Kabira, & Channa Mereya</span>
          </div>
        </div>

        <div className="player-actions">
          <button
            className={`play-pause-btn ${isPlaying ? "playing" : ""}`}
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          
          <button
            className="mute-btn"
            onClick={() => setIsMuted(!isMuted)}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="visualizer-wrapper">
        <canvas ref={canvasRef} />
      </div>

      {/* Track Selector Tab */}
      <div className="track-tabs font-mono" style={{ flexWrap: "wrap" }}>
        {tracks.map((t) => (
          <button
            key={t.id}
            className={`track-tab-btn ${track === t.id ? "active" : ""}`}
            onClick={() => handleTrackSelect(t.id)}
          >
            {t.id === "acoustic" && <Sparkles size={12} className="inline mr-1" />}
            {t.id === "lofi" ? "Lo-fi" : t.id === "acoustic" ? "Acoustic" : t.id === "kesariya" ? "Kesariya" : t.id === "kabira" ? "Kabira" : "Channa Mereya"}
          </button>
        ))}
      </div>
    </div>
  );
}
