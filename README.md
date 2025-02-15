# 
# 🏥 TEAM DIAGNOTIX: AI-Assisted Telemedicine Kiosk
# 

🔹 **Healthcare AI-Assisted Telemedicine KIOSK for Rural Areas.**  
This Telemedicine Kiosk is integrated with:  
✅ **Portable health testing kit**  
✅ **AI-based diagnostics**  
✅ **Support for speech and hearing-impaired individuals**  
✅ **Smart medication management**  



---

# ✋ HAND GESTURE RECOGNITION OVERVIEW  

## 🛠️ 1. Different Approaches for Hand Gesture Recognition  

### 📌 Approach 1: Glove-Based (Electromechanical Devices)  
- Uses **sensors** to capture hand position and movement.  
- Provides **high accuracy**.  
- 🚫 **Expensive** and **not user-friendly**.  

### 📌 Approach 2: Vision-Based (Using a Camera)  
- Uses a **webcam** to track hand movements.  
- **No additional hardware** required (**Cost-effective**).  
- **Challenges:**  
  🔸 **Hand variability** (different skin colors, angles, and positions).  
  🔸 **Lighting conditions** affect detection.  
  🔸 Requires **pre-processing** for accuracy.  

---

## 🔍 2. Hand Detection & Preprocessing  

✅ **We use MediaPipe to detect hands and extract key landmarks.**  
🔹 **Steps:**  
1️⃣ Capture an image from the **webcam**.  
2️⃣ Convert the image to **grayscale** using **OpenCV**.  
3️⃣ Apply **Gaussian Blur** to reduce noise.  
4️⃣ Convert the grayscale image to **binary** using **thresholding**.  

---

## 📊 3. Data Collection for Sign Language (A-Z)  

🔹 **Hand sign images are collected from multiple angles.**  
🛑 **Challenges:**  
- Requires a **clean background**.  
- Needs **proper lighting conditions**.  
- **Real-world conditions** make detection difficult.  

---
![image](https://github.com/user-attachments/assets/5ea598f9-7c6d-407f-bfbf-22c6bd4e12a9)
## 🚀 4. Improved Approach: Using MediaPipe Hand Landmarks  

✅ **Extracts 21 key points** from the hand.  
✅ Uses **coordinates instead of raw images**.  
✅ **Advantages:**  
- 🔸 Works in **any background**.  
- 🔸 Less dependent on **lighting conditions**.  
- 🔸 **Computationally efficient**.  
- 🔸 Ideal for **training AI models**.  

---

![image](https://github.com/user-attachments/assets/88279d2c-18b5-450f-abc9-0c7cb66bc14b)

---
## 🔥 IMPLEMENTATION ( Currently Working on it more Updation)

Find the **Diagnotix's Teleconsultation Portal** here:  
🌐 **[Diagnotix Portal](https://diagnotixs.netlify.app/)**  
