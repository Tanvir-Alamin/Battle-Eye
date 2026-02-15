import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: [`role`, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role`);
      return data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
