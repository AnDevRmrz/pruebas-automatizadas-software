const { test, expect } = require("@playwright/test");
const { SignInPage } = require("../page_objects/sign_in_page");

test("Should sign up the ghost adminstrator correctly", async ({ page }) => {
  // Given
  const signInPage = new SignInPage(page);
  await signInPage.goto();
  signInPage.signIn("alguien@hotmail.com", "123456#213asdf");

  // When
  
  
});