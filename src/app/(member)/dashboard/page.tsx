/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useFetchUser } from "@/app/hooks/useUser";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const userId = session?.user._id;

  const { user, loading, error } = useFetchUser(userId as string);

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="w-[250px] h-[250px] border border-gray-200 rounded-sm shadow-sm overflow-hidden p-2">
        <img src="/img/boy.png" alt="boy" className="w-full object-contain" />
      </div>

      <div className="col-span-2">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900">Fullname</dt>
            <dd className="mt-1 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.fullname.toUpperCase()}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900">Email</dt>
            <dd className="mt-1 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.email}
            </dd>
          </div>
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium text-gray-900">Gender</dt>
            <dd className="mt-1 text-gray-700 sm:col-span-2 sm:mt-0">
              {user?.gender.toUpperCase()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
