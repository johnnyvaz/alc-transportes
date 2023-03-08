import type { User } from "./user.server";
import { supabase } from "./user.server";
import type { Route } from "~/types";


export async function getRouteListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("routes")
    .select("id, orderid, route, stop, printed")
    .eq("profile_id", userId)
    .eq("printed", false)
    .eq("concluded", false)
    .order("route")

  return data;
}

export async function getRoutePrintedListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("routes")
    .select("id, orderid, route, stop, printed")
    .eq("profile_id", userId)
    .eq("printed", true)
    .eq("concluded", false)
    .order("date_printed", { ascending: false });
  return data;
}

export async function createRoute(orderid? : Route["orderid"],
                                  route? : Route["route"],
                                  stop? : Route["stop"],
                                  userId? : User["id"]) {
  const { data, error } = await supabase
    .from("routes")
    .insert([{ orderid, route, stop, profile_id: userId, printed: false }])
    .single();

  if (!error) {
    return data;
  }
  return null;
}

export async function createRouteBatch(routeBatch) {
  console.log("routeBatch" + JSON.stringify(routeBatch))
  const { data, error } = await supabase
    .from("routes")
    .insert(routeBatch);

  if (!error) {
    return data;
  }
  console.log("Erro database" + JSON.stringify(error.message))
  return error;
}

export async function getRoute(orderid? : Route["orderid"], userId?: User["id"]) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("profile_id", userId)
    .eq("orderid", orderid)
    .eq("printed", false)
    .eq("concluded", false)
    .single();

  if (!error) {
    return <Route>{
      userId: data.profile_id,
      id: data.id,
      orderid: data.orderid,
      route: data.route.toString(),
      stop: data.stop,
      printed: data.printed,
      datePrinted: data.datePrinted,
      dateCreated: data.dateCreated,
      profile_id: data.profile_id
    };
  }
  return null;
}

export async function setRoutePrinted(Id? : Route["id"]) {
  const dataprinted = new Date();
  const { data, error } = await supabase
    .from("routes")
    .update({ printed : 'true', date_printed: dataprinted})
    .eq("id", Id);
  if (!error) {
    return {
      data
    };
  }
  return null;
}

export async function setConcluded(userId?: User["id"]) {
  const { data, error } = await supabase
    .from("routes")
    .update({ concluded : 'true'})
    .eq( "concluded", false)
    .eq("profile_id", userId)
  ;
  if (!error) {
    return {
      data
    };
  }
  return null;
}
