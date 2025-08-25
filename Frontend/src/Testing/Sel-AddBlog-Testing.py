from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
import time
import os

# Initialize WebDriver
driver = webdriver.Chrome()

try:
    # Open the AddStory page
    driver.get("http://localhost:3000/addstory")  # Replace with your correct local URL or deployed URL
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)

    # Fill in the title
    title_field = wait.until(EC.presence_of_element_located((By.ID, "title")))
    title_field.send_keys("My Test Story")
    print("Title added successfully.")

    # Add content using CKEditor
    ckeditor_frame = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "ck-editor__editable")))
    actions = ActionChains(driver)
    actions.move_to_element(ckeditor_frame).click().perform()
    actions.send_keys("This is a test content for the story.").perform()
    print("Content added successfully.")

    # Upload an image
    image_input = driver.find_element(By.XPATH, '//input[@type="file"]')
    image_path = os.path.abspath("D:\\POMY.jpg")  # Update with correct path
    image_input.send_keys(image_path)
    print("Image uploaded successfully.")

    # Wait for the Publish button to be clickable
    publish_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, '//button[text()="Publish "]'))
    )
    
    # Scroll the button into view and click it
    driver.execute_script("arguments[0].scrollIntoView(true);", publish_button)
    publish_button.click()
    print("Publish button clicked.")

    # Wait for success message
    success_message = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "success_msg")))
    assert "Add story successfully" in success_message.text
    print("Story added successfully.")

    # Optional: Check redirection or the home link
    home_link = success_message.find_element(By.LINK_TEXT, "Go home")
    home_link.click()
    print("Navigated back to home.")

except Exception as e:
    print(f"Test failed: {e}")

finally:
    # Close the browser
    driver.quit()
