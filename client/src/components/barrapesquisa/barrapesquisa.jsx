import React, { useState } from "react";
import "./barrapesquisa.css";

/**
 * Usar:
 * <SearchBar onSearch={(term) => console.log(term)} placeholder="Pesquisar" buttonLabel="Buscar" />
 */
export default function SearchBar({ placeholder = "Pesquisar", buttonLabel = "Buscar", onSearch }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(value.trim());
  };

  return (
    <form className="sb-form" onSubmit={handleSubmit} role="search" aria-label="Barra de pesquisa">
      <input
        className="sb-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
      />

      <button className="sb-button" type="submit" aria-label={buttonLabel}>
        <span className="sb-button-text">{buttonLabel}</span>

        {/* ícone SVG (sem dependências externas) */}
        <svg className="sb-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M20 20 L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}
