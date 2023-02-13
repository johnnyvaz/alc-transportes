import type { User } from "./user.server";
import { supabase } from "./user.server";

export type Setting = {
  id: string;
  name: string;
  address: string;
  profile_id: string;
};

export async function getSettingsListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("settings")
    .select("id, name")
    .eq("profile_id", userId);

  return data;
}

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

export async function deleteConfigPrinter({
  id,
  userId,
}: Pick<Setting, "id"> & { userId: User["id"] }) {
  const { error } = await supabase
    .from("settings")
    .delete({ returning: "minimal" })
    .match({ id, profile_id: userId });

  if (!error) {
    return {};
  }

  return null;
}

export async function getConfigPrinter({
  id,
  userId,
}: Pick<Setting, "id"> & { userId: User["id"] }) {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("profile_id", userId)
    .eq("id", id)
    .single();

  if (!error) {
    return {
      userId: data.profile_id,
      id: data.id,
      name: data.name,
      address: data.address,
    };
  }

  return null;
}
