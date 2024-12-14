import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      // Add your sign out API endpoint here
      const response = await fetch('your-api-endpoint/signout', {
        method: 'POST',
        credentials: 'include', // if using cookies
      });

      if (response.ok) {
        // Clear any local storage/state here
        localStorage.removeItem('token'); // if using JWT
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex items-center gap-2 hover:text-red-600"
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
};

export default SignOutButton; 