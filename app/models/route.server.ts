import type { User } from "./user.server";
import { supabase } from "./user.server";
import { Route } from "~/types";


export async function getRouteListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("routes")
    .select("id, orderid, route, stop, printed")
    .eq("profile_id", userId)
    .eq("printed", false);
  return data;
}

export async function getRoutePrintedListItems({ userId }: { userId: User["id"] }) {
  const { data } = await supabase
    .from("routes")
    .select("id, orderid, route, stop, printed")
    .eq("profile_id", userId)
    .eq("printed", true);
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

export async function getRoute(orderid? : Route["orderid"], userId?: User["id"]) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("profile_id", userId)
    .eq("orderid", orderid)
    .eq("printed", false)
    .order('id', {ascending: false})
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

  const { data, error } = await supabase
    .from("routes")
    .update({ printed : 'true'})
    .match({id : Id});

  if (!error) {
    return {
      data
    };
  }
  return null;
}
