export const authStyles = {
  button: {
    padding: '0.625rem 1rem',
    borderRadius: '0.625rem',
    backgroundColor: '#059669',
    color: 'white',
    fontWeight: '500',
    transition: 'all 150ms ease',
  },
  input: {
    borderRadius: '0.625rem',
    padding: '0.625rem 1rem',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    transition: 'all 150ms ease',
  },
  label: {
    color: '#4b5563',
    marginBottom: '0.25rem',
    fontSize: '0.813rem',
  },
  message: {
    borderRadius: '0.625rem',
    padding: '0.625rem 1rem',
    marginBottom: '0.75rem',
    fontSize: '0.813rem',
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    color: '#059669',
  },
  anchor: {
    color: '#059669',
    fontSize: '0.813rem',
    textDecoration: 'none',
    transition: 'color 150ms ease',
  },
  container: {
    gap: '0.75rem',
  },
} as const;

export const authStylesHover = {
  button: {
    backgroundColor: '#047857',
    transform: 'translateY(-1px)',
  },
  input: {
    borderColor: '#059669',
  },
  inputFocus: {
    borderColor: '#059669',
    boxShadow: '0 0 0 2px rgba(5, 150, 105, 0.1)',
  },
  anchor: {
    color: '#047857',
    textDecoration: 'underline',
  },
} as const;