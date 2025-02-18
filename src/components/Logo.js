import React from "react";

export default function Logo() {
    return (
      <a className="navbar-brand" href="/dashboard" style={styles.logoContainer}>
        <h3 style={styles.logoText}>WINNING EDGE</h3>
      </a>
    );
  }
  
  const styles = {
    logoContainer: {
      textDecoration: 'none', // remove underline
    },
    logoText: {
      fontFamily: 'Arial, sans-serif', // You can replace this with a custom font if needed
      fontWeight: 'bold',
      fontSize: '24px',
      color: '#00ff66', // Light green color
      border: '2px solid #00ff66', // Light green border around the text
      padding: '5px 15px', // Add some padding to make the border look nice
      borderRadius: '5px', // Slightly rounded corners
    }
  };
  