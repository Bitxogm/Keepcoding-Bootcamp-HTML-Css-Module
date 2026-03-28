export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t mt-auto py-6 text-center text-sm text-muted-foreground">
      <p>© {currentYear} PC Components Dashboard</p>
    </footer>
  );
};
