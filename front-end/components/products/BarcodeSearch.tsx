import React, { useState } from "react";

type LookupResult = any; // keep it flexible; front-end types can be tightened later

const API_KEY = "4FA5CF5C62C8D7C2D016514F2096F9FD";

const BarcodeSearch: React.FC = () => {
  const [upc, setUpc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LookupResult | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only digits
    const value = e.target.value.replace(/\D/g, "");
    setUpc(value);
  };

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setResult(null);

    if (!upc) {
      setError("Please enter a barcode (UPC).\n");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${upc}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <label htmlFor="upc-input" style={{ display: "none" }}>
          UPC
        </label>
        <input
          id="upc-input"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter barcode (digits only)"
          value={upc}
          onChange={onChange}
          style={{ padding: 8 }}
        />
        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Looking up..." : "Lookup"}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        {error && (
          <div style={{ color: "#b00020", whiteSpace: "pre-wrap" }}>Error: {error}</div>
        )}

        {result && (
          <details style={{ marginTop: 8 }}>
            <summary>Lookup result (click to expand)</summary>
            <pre style={{ maxHeight: 400, overflow: "auto", background: "#f6f8fa", padding: 12 }}>
              {JSON.stringify(result, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </section>
  );
};

export default BarcodeSearch;
