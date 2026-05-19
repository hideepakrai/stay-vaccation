import { CSSProperties } from "react";

export const sectionStyles: CSSProperties = {
  padding: '5rem 0',
  background: 'linear-gradient(180deg, #f0f9ff 0%, var(--cream) 100%)'
};

export const ratingStyles: CSSProperties = {
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'rgba(255,255,255,0.92)',
  backdropFilter: 'blur(4px)',
  padding: '0.3rem 0.7rem',
  borderRadius: '2rem',
  fontSize: '0.78rem',
  fontWeight: 700,
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
};

export const durationStyles: CSSProperties = {
  position: 'absolute',
  bottom: '1.25rem',
  left: '1.25rem',
  backgroundColor: '#2fa3f2',
  color: '#fff',
  fontSize: '0.625rem',
  fontWeight: 900,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  padding: '0.375rem 1rem',
  borderRadius: '2rem',
  boxShadow: '0 10px 15px -3px rgba(47, 163, 242, 0.3)',
};

export const categoryStyles: CSSProperties = {
  fontSize: '0.72rem',
  fontWeight: 700,
  color: 'var(--sky)',
  textTransform: 'uppercase',
  marginBottom: '0.4rem'
};

export const titleStyles: CSSProperties = {
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 700,
  fontSize: '1.05rem',
  marginBottom: '0.5rem',
  lineHeight: '1.4'
};

export const bookBtnStyles: CSSProperties = {
  background: 'linear-gradient(135deg, var(--sky), var(--sky-dk))',
  color: '#fff',
  padding: '0.55rem 1.2rem',
  borderRadius: '2rem',
  fontWeight: 700,
  border: 'none',
  fontSize: '0.8rem',
  cursor: 'pointer',
  boxShadow: '0 2px 10px rgba(14, 165, 233, 0.15)'
};
