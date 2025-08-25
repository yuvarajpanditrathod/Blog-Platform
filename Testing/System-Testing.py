from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
import os
import time

# Initialize WebDriver
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    print("Starting Register and Add Blog Test...")

    # Redirect to the registration page
    driver.get("http://localhost:3000/register")


    driver.find_element(By.XPATH, '//input[@placeholder="Enter username"]').send_keys("01fe23bcs428")
    driver.find_element(By.XPATH, '//input[@placeholder="example@kletech.ac.in"]').send_keys("01fe23bcs428@kletech.ac.in")
    driver.find_element(By.XPATH, '//input[@placeholder="6+ strong character"]').send_keys("123456")
    driver.find_element(By.XPATH, '//input[@placeholder="Confirm password"]').send_keys("123456")

    # Click Register button
    register_button = driver.find_element(By.XPATH, '//button[text()="Register"]')
    driver.execute_script("arguments[0].scrollIntoView(true);", register_button)
    WebDriverWait(driver, 10).until(EC.element_to_be_clickable(register_button))
    driver.execute_script("arguments[0].click();", register_button)

    WebDriverWait(driver, 10).until(EC.url_changes("http://localhost:3000/register"))

    driver.get("http://localhost:3000/addstory")
    print("Navigated to Add Story page.")

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "title"))).send_keys("This is a test title created by Selenium automation testing tool")

    ckeditor_frame = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "ck-editor__editable")))
    ActionChains(driver).move_to_element(ckeditor_frame).click().send_keys("This is a test content about Selenium testing tool. Selenium is a powerful tool for controlling a web browser through the program. It is functional for all browsers, works on all major OS, and its scripts can be written in various programming languages.").perform()

    # Locate the image file and upload
    print("Locating the file input for image upload...")
    image_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//input[@name="image"]'))
    )

    driver.execute_script("arguments[0].style.display = 'block';", image_input)
    print("File input is now visible.")


    image_path = r"C:/Users/Yuvaraj/Downloads/seleniumImage.png"
    print(f"Image path to be uploaded: {image_path}")
    
    image_input.send_keys(image_path)
    print("Image file input field has received the file path.")

    uploaded_file = image_input.get_attribute('value')
    if uploaded_file:
        print(f"File uploaded: {uploaded_file}")
    else:
        print("File upload failed. The input value is empty.")

    publish_button = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, '//button[text()="Publish "]')))
    driver.execute_script("arguments[0].scrollIntoView(true);", publish_button)
    driver.execute_script("arguments[0].click();", publish_button)

    success_message = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "success_msg")))
    assert "Add story successfully" in success_message.text
    print("Blog published successfully.")

except Exception as e:
    print(f"Test failed: {e}")
finally:
    driver.quit()
    print("Test completed successfully")
