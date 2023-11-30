import {
  CreateParams,
  DeleteParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
  fetchUtils,
} from "ra-core";
import { BASE_URL } from "./envs";
export const http = fetchUtils.fetchJson;

export const customProvider = (auth) => ({
  getList: async (resource: string, params: GetListParams) => {
    const query = new URLSearchParams({
      page: params.pagination.page.toString(),
      limit: params.pagination.perPage.toString(),
      sort: params.sort.field,
      order: params.sort.order,
      search: params.filter.globalSearch ?? "",
    });

    const token = await auth.getJWTToken();
    let url = `${BASE_URL}/${resource}?${query}`;

    if (resource === "subCategory") {
      url = `${BASE_URL}/category/sub-category/${params.filter.id}`;
    }

    if (resource === "landing-page") {
      console.log("landing-page");

      url = "https://trucknearthsales.com.au/api/getData";
    }

    const resp = await http(url, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    if (!resp.json.data) {
      throw new Error(resp.json.message);
    }

    const data = resp.json.data.results;
    const total = resp.json.data.total;

    return { data, total };
  },

  getOne: async (resource: string, params: GetOneParams) => {
    const url = `${BASE_URL}/${resource}/${params.id}`;

    console.log(resource);

    const token = await auth.getJWTToken();

    const resp = await http(url, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    if (!resp.json.data) {
      throw new Error(resp.json.message);
    }

    const data = resp.json.data;
    return { data };
  },

  create: async (resource: string, params: CreateParams) => {
    let url = `${BASE_URL}/${resource}`;

    if (!params.data) {
      throw new Error("No data provided");
    }

    let body = { categoryName: params.data.categoryName, categoryId: "" };

    if (resource === "subCategory") {
      url = `${BASE_URL}/category/sub-category/${params.data.categoryId}`;
      body = {
        categoryName: params.data.subCategoryName,
        categoryId: params.data.categoryId,
      };
    }

    const token = await auth.getJWTToken();

    const resp = await http(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    if (!resp.json.data) {
      throw new Error(resp.json.message);
    }

    const data = resp.json.data;
    const total = data.length;

    return { data, total };
  },

  update: async (resource: string, params: UpdateParams) => {
    const url = `${BASE_URL}/${resource}/${params.id}`;
    if (!params.data) throw new Error("No data provided");
    const body = { categoryName: params.data.categoryName };

    const token = await auth.getJWTToken();

    const resp = await http(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    if (!resp.json.data) {
      throw new Error(resp.json.message);
    }

    const data = resp.json.data;
    const total = data.length;

    return { data, total };
  },

  delete: async (resource: string, params: DeleteParams) => {
    const url = `${BASE_URL}/${resource}/${params.id}`;

    const token = await auth.getJWTToken();

    const resp = await http(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });

    if (!resp.json.data) {
      throw new Error(resp.json.message);
    }

    return { data: "Record deleted successfully" };
  },
});
