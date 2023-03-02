import type { User } from "./user.server";
import { supabase } from "./user.server";
import type { Setting } from "~/types";
import { Route } from "~/types";

export async function createConfigPrinter({
  name,
  address,
  userId,
}: Pick<Setting, "name" | "address"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("settings")
    .insert([{ name, address, profile_id: userId }])
    .single();

  if (!error) {
    return data;
  }

  return null;
}

export async function updateAddress(userId?: string, address?: string) {
  const { data, error } = await supabase
    .from("settings")
    .update({ address : address} )
    .match({ profile_id: userId, default: true })
  if (!error) {
    return data;
  }
  return null;
}

export async function updateName(userId?: string, name?: string) {
  const { data, error } = await supabase
    .from("settings")
    .update({ name : name} )
    .match({ profile_id: userId, default: true })
  if (!error) {
    return data;
  }
  return null;
}

export async function getConfigPrinter(userId?: User["id"]) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("profile_id", userId)
    .eq("default", true)
    .single();
  console.log("configuração da impressora" + JSON.stringify(data));
  if (!error) {
    return <Setting>{
      id: data.id,
      name: data.name,
      address: data.address,
      default: data.default,
      profile_id: data.profile_id
    };
  }

  return null;
}
