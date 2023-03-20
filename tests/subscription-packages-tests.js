import { urls } from "../data/urls";
import { packagesDetails } from "../data/packagesDetails";
import HomePage from "../pages/HomePage";

fixture`Subscription Packages Tests`.page(urls.home).beforeEach(async (t) => {
  await t.maximizeWindow();
  await t.setNativeDialogHandler(() => true);
});

test("Validate packages type, price and currency - successfully", async (t) => {
  const homePage = new HomePage();

  for (const packageDetails of packagesDetails) {
    await homePage.selectCountry({ packageDetails });

    await homePage.validatePlans({ packageDetails });
  }
}).meta({
  customTest: "validate-packages-type-price-and-currency-successfully",
});
