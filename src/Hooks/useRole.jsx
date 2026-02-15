import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: [`role`, user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `http://localhost:3000/user/role/${user?.email}`,
      );
      return data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
