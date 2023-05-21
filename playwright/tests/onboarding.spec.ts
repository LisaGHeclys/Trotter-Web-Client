import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

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
  await cityNameInput.type("Lisboa");

  await page.getByTestId("goOnTrip").click();

  await expect(page).toHaveURL(`${BASE_URL}/map`);

  //TODO: check why api calls not made
});

test("login and modify trip", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);

  //TODO: the test xd
});
