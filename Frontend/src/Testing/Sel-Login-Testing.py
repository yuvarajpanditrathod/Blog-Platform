import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Chrome driver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Open the login page
driver.get("http://localhost:3000/authlogin")

# Wait for the email input field to be present
try:
    email_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "email"))
    )
    email_input.send_keys("01fe23bcs402@kletech.ac.in")
    print("Email field found and value entered.")
except Exception as e:
    print(f"Error locating email input: {str(e)}")

# Wait for the password input field to be present
try:
    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    password_input.send_keys("123")
    print("Password field found and value entered.")
except Exception as e:
    print(f"Error locating password input: {str(e)}")

# Click the login button
login_button = driver.find_element(By.TAG_NAME, "button")
login_button.click()
print("Login button clicked.")

# Wait for the homepage to load and check for redirection
try:
    WebDriverWait(driver, 10).until(
        EC.url_changes("http://localhost:3000/authlogin")  # Wait for URL to change
    )
    print("Redirect successful.")
except:
    print("Error: No URL change detected after login.")

# Wait for a homepage element to confirm successful redirection
try:
    homepage_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h2[contains(text(),'Welcome')]"))
    )
    print("Successfully redirected to the homepage.")
except Exception as e:
    print(f"Error: Could not find expected element on the homepage. {str(e)}")

# Sleep for 3 seconds to ensure the page loads properly
time.sleep(3)

# Optionally, clear the input fields (if needed)
email_input.clear()
password_input.clear()

# Quit the driver
driver.quit()
