import React, { createContext, useContext, useState, useEffect } from 'react';
import { CATEGORY_THEMES } from '../config/ThemeConfig';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(CATEGORY_THEMES[1]); 
  const [loading, setLoading] = useState(true);

  const updateTheme = () => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        
        // Clean the input from DB
        const userCat = userData.category?.toString().trim().toLowerCase();
        
        console.log("🛠️ Engine Attempting Match for:", userCat);

        // Find the matching object in ThemeConfig
        const found = Object.values(CATEGORY_THEMES).find(t => 
          t.category.trim().toLowerCase() === userCat
        );

        if (found) {
          console.log(`✅ Theme Activated: ${found.title}`);
          setTheme(found);
        } else {
          console.warn(`⚠️ Mismatch: "${userCat}" not found in Config. Defaulting to SmartStyle.`);
          setTheme(CATEGORY_THEMES[1]);
        }
      } catch (err) {
        console.error("❌ Theme Engine Error:", err);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    updateTheme();
    window.addEventListener('storage', updateTheme);
    return () => window.removeEventListener('storage', updateTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
      {!loading && children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);