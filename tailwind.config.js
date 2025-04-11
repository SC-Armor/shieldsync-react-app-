.pulse-glow {
  background: radial-gradient(circle, rgba(255,87,34,0.9) 0%, rgba(255,87,34,0.5) 40%, rgba(255,87,34,0) 70%);
  border-radius: 50%;
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.85;
  }
  70% {
    transform: scale(1.05);
    opacity: 0.1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.85;
  }
}
