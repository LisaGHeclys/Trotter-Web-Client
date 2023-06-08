import { test, expect } from "@playwright/test";
import { seedDb } from "./helpers";

const BASE_URL = "http://localhost:3000";

test.beforeAll(async () => await seedDb());
test.afterAll(async () => await seedDb());

test("register", async ({ page }) => {
  await page.goto(`${BASE_URL}/register`);

  const emailInput = page.getByTestId("emailInput");
  await emailInput.click();
  await emailInput.type("playwright@trotter.app");

  const passwordInput = page.getByTestId("passwordInput");
  await passwordInput.click();
  await passwordInput.type("playwright");

  await page.getByTestId("submitRegister").click();

  await expect(page).toHaveURL(`${BASE_URL}/travel`);

  const cityNameInput = page.getByTestId("cityName");
  await cityNameInput.click();
  await cityNameInput.type("Paris");

  await page.getByTestId("goOnTrip").click();

  await expect(page).toHaveURL(`${BASE_URL}/map`);
});

test("login and modify trip", async ({ page }) => {
  await page.goto(`${BASE_URL}/login`);

  const emailInput = page.getByTestId("emailInput");
  await emailInput.click();
  await emailInput.type("playwright@trotter.app");

  const passwordInput = page.getByTestId("passwordInput");
  await passwordInput.click();
  await passwordInput.type("playwright");

  await page.getByTestId("submitLogin").click();

  await expect(page).toHaveURL(`${BASE_URL}/travel`);

  const cityNameInput = page.getByTestId("cityName");
  await cityNameInput.click();
  await cityNameInput.type("Lisboa");

  await page.getByTestId("goOnTrip").click();

  await expect(page).toHaveURL(`${BASE_URL}/map`);
});
