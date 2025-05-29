# A Multi-View Dashboard For Predicting Learners' Course Completion Outcomes And Course Recommendation

[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-3.2.25-green)](https://www.djangoproject.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4.9-orange)](https://www.chartjs.com/)
[![CoreUI](https://img.shields.io/badge/CoreUI-4.3.0-purple)](https://coreui.io/)

A multi-view dashboard for analyzing MOOCs (Massive Open Online Courses) - MOOC data quality, evaluating predicting learners' course completion outcomes and evaluating course recommendation models. This project focuses on direct and indirect evaluation metrics to assess dataset quality and model performance in two educational system.

It demonstrates how Business Intelligence (BI) techniques and machine learning models can support online education through real-time insights and early intervention.

<!-- This website is part of a project focusing on predicting learners' course completion outcomes using MOOC-CubeX data. It demonstrates how Business Intelligence (BI) techniques and machine learning models can support online education through real-time insights and early intervention. -->

**DemoVideo**: https://drive.google.com/drive/folders/1AXezCvHdoyH_qqfTX6YcpZ29I4j0Rztt?usp=sharing

## Table of Contents

- [I. Research Objectives](#i-research-objectives)
- [II. Data Processing & Evaluation Functions](#ii-data-processing--evaluation-functions)
- [III. Architecture](#iii-architecture)
- [IV. Website Overview](#iv-website-overview)
- [V. Setup and Installation](#v-setup-and-installation)
- [VI. API Endpoints](#vi-api-endpoints)
- [VII. Dependencies](#vii-dependencies)
- [VIII. Deployment Notes](#viii-deployment-notes)
- [IX. Contributors](#ix-contributors)


## I. Research Objectives

### **1. Predicting Course Completion Outcomes & Data Quality Assessment**

* **Objective**: Build deep learning models to predict whether learners will complete online courses, while also evaluating the quality of the learning data.  
* **Approach**:  
  * Use MOOC-CubeX dataset for training and evaluation.  
  * Enhance baseline models with Graph Neural Networks (GNNs).  
  * Apply data augmentation techniques to improve model robustness.  
  * Define and measure data quality through direct and indirect metrics.  
  * Analyze how data quality impacts model performance.  
### **2. Course Recommendation Systems On MOOCs & Data Quality Assessment**

* **Objective**: Develop a comprehensive framework for evaluating MOOCs recommendation systems, with particular emphasis on assessing data quality as a foundation for reliable model performance.
* **Approach**:
  * Implement dual evaluation methodology combining direct (data quality) and indirect (model performance) metrics.
  * Assess dataset by direct evaluation (completeness and consistency) and indirect evaluation (Reliability (MAP),  Relevance (Precision, Recall, NDCG)) at different cutoff thresholds.
  * Evaluate recommendation models performance using F1-Score at different cutoff thresholds.
  * Visualize quality metrics and model performance through an interactive dashboard.
  * Analyze correlation between data quality indicators and recommendation accuracy.
  <!-- * Provide actionable insights for dataset improvement and model optimization. -->

## II. Data Processing & Evaluation Functions

### 1. **Data Preparation Pipeline**

- Clean, normalize, and augment MOOCCubeX dataset.  
- Merge multi-file sources into a unified structure.

### 2. Predicting Course Completion Outcomes: 

#### **Direct Quality Metrics**

- **Completeness**: measures the proportion of non-missing values across all fields.  
  - *Formula:* `Completeness = (Number of non-null values / Total expected values) × 100%`  
  - A high completeness score ensures sufficient data is available for learning and evaluation.  
- **Consistency**: Assesses whether the data follows predefined logical and relational rules  
**Validation Criteria:**
1. Domain Range: Values fall within predefined ranges
2. Non-null: Values exist where required
3. Data Type: Values conform to specified data types
4. Logical Constraints: Values satisfy logical conditions
5. Uniqueness: Values are unique where required
6. Foreign Key Integrity: References exist in valid lists

#### **Indirect Quality Metrics**  
- **Reliability**  
  - Refers to the stability and trustworthiness of the data source and collection process.  
  - In this project, reliability is reinforced by:  
    * Using MOOC-CubeX, a benchmark dataset.  
    * Applying standardized preprocessing pipelines to reduce human bias and random noise.  
- **Relevance**  
  - Measures how suitable and useful the data is for achieving the project’s goals.  
  - For this system, relevance is ensured by:  
    * Selecting features directly tied to learner performance and behavior.  
    * Aligning the dataset attributes with model input requirements (e.g., engagement metrics, score progression, demographics).  
#### **Model Functions**  
- Split data into training, validation, and test sets.  
- Train GNN-based models and compare results with baseline models.  
- Metrics used:  
  - **Accuracy**: Percentage of correct predictions.  
  - **Precision, Recall, F1-score**: For multi-class classification.  
  - **Macro Average**: Gives equal weight to all classes.  
  - **Weighted Average**: Accounts for class imbalance based on class frequency.
### 3. Course Recommendation Systems On MOOCs: 
#### Direct Evaluation

##### Completeness
Completeness measures the presence of all required values in the dataset, crucial for reliable recommendation systems.

**Metrics:**
- Missing value rate
- Field completion ratio
- Required field coverage

**Calculation:**
```
Completeness = (Number of non-missing values / Total expected values) × 100%
```

##### Consistency
Consistency ensures data uniformity across sources with no conflicting information.

**Validation Criteria:**
1. Domain Range: Values fall within predefined ranges
2. Non-null: Values exist where required
3. Data Type: Values conform to specified data types
4. Logical Constraints: Values satisfy logical conditions
5. Uniqueness: Values are unique where required
6. Foreign Key Integrity: References exist in valid lists


#### Indirect Evaluation
Evaluates the data quality through these indicators at different cutoff thresholds (typically @5 and @10) :

##### Reliability Metrics
- **MAP (Mean Average Precision)**: Measures ranking quality
  ```
  MAP@k = mean(AP@k for each user)
  ```

##### Relevance Metrics
- **Precision**: Ratio of relevant items among all recommended items
  ```
  Precision@k = (# of relevant items in top-k) / k
  ```
- **Recall**: Ratio of relevant items retrieved from all relevant items
  ```
  Recall@k = (# of relevant items in top-k) / (total # of relevant items)
  ```
- **F1-Score**: Harmonic mean of precision and recall, providing a balanced measure
  ```
  F1@k = 2 * (Precision@k * Recall@k) / (Precision@k + Recall@k)
  ```
- **NDCG (Normalized Discounted Cumulative Gain)**: Measures ranking quality with position importance
  ```
  NDCG@k = DCG@k / IDCG@k
  ```

#### F1-Score for Model Performance

The F1-Score is particularly valuable in our recommendation system evaluation for several reasons:

-  **Balance between Precision and Recall**: In educational recommendation contexts, we need to balance recommending relevant courses (precision) while not missing important learning opportunities (recall).

- **Handling Class Imbalance**: The MOOCs dataset often contains imbalanced class distributions, where some courses have many more enrollments than others. F1-score helps provide a more realistic performance measure in such cases.

- **Threshold Selection**: Different recommendation models may perform optimally at different thresholds. F1-score helps in selecting the optimal threshold for each model.

We evaluate the F1-score at different cutoff thresholds (typically @5 and @10) to assess model performance in both short and extended recommendation lists.

## III. Architecture

```
┌────────────────┐         ┌────────────────┐
│                │         │                │
│   React.js     │◄───────►│    Django      │
│   Frontend     │   API   │    Backend     │
│                │         │                │
└────────────────┘         └────────────────┘
        │                          │
        │                          │
        ▼                          ▼
┌────────────────┐         ┌────────────────┐
│                │         │                │
│  Visualization │         │  Database      │
│  (Chart.js)    │         │  (MongoDB)     │
│                │         │                │
└────────────────┘         └────────────────┘
```

## IV. Website Overview

The application contains three main interactive pages:

### **1. Overview page**

- **Purpose**: Explore raw MOOC dataset files before processing.

- **Key Features:**

  - **Dataset File List**  
    A complete list of all available data files related to MOOCs (e.g., user info, course details, learning activity logs).  
  - **Summary Statistics per File**  
    For each file, the page displays:  
    - Number of rows and columns  
    - Percentage of missing values  
    - Basic descriptive statistics (mean, min, max, etc.)  
  - **Missing Data Overview**  
    Visual summary of **missing data distribution** across files using bar charts or heatmaps.

### **2. Education Management**

- **Purpose**: Evaluate compiled dataset and quality metrics.

- **Key Features:**  
  * Dataset Summary: Presents the structure and size of the compiled dataset, including the number of rows, columns, and updated missing value rates after preprocessing. 
  * Label Distribution: Visualizes the frequency distribution of classification labels (A–E) using an interactive bar chart, enabling quick insights into class balance.
  * Quality Metrics:  Offers graphical representations of both direct and indirect data quality indicators.
  * Model Performance: Includes visual performance summaries under macro and weighted evaluation schemes.
  * Export Report: This feature allows users to export a standardized and well-formatted report, 
which includes all key contents presented in this section. The report is designed to support formal reporting processes by course administrators or educational stakeholders. 
Specifically, it includes:   
    * Detailed description of the compiled dataset used.
    * Distribution and percentage of classification labels (A–E).
    * Evaluated data quality metrics, including both direct (completeness, consistency) and indirect (reliability, relevance) measures. 
    * Summary of model performance results.
### **3. Personalized Learning**  
- **Purpose**: Visualization of the compiled data and its quality through relevant metrics, along with an overview of model performance through performance visualizations.
- **Key Features**:
  - **Dataset Information:**
    - Number of rows, columns, missing rate, data type
    - Descriptive statistics
    - Demographic analysis (gender distribution)
    - Field popularity visualization

  - **Direct Evaluation:**
    - Data completeness assessment
    - Data consistency verification
    - Error logging and issue identification
    
  - **Indirect Evaluation:**
    - Recommendation model reliability metrics using MAP at different cutoff thresholds (@5, @10)
    - Relevance measurement at different cutoff thresholds (@5, @10) using Precision, Recall, and NDCG
    - Performance evaluation overview using F1-Score
    - Comparative visualization of model performance

<!-- ## **IV.  Tech Stack & Tools**

| Layer | Technologies |
| :---: | :---: |
| **Front-End** | React, Core UI, CSS |
| **Back-End** | Next.js (API routes), Mongoose |
| **Database** | MongoDB Atlas |
| **Storage** | Cloudinary (for image hosting if needed) |
| **Streaming** | Kafka (simulated for real-time data flow) |
| **Visualization** | Chart.js, CoreUI React Chart | -->

## V. Setup and Installation

### Prerequisites
- Node.js >= 16.x
- Python >= 3.11.5
- MongoDB
- npm or yarn

### Backend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moocs-recommendation-dashboard.git
   cd moocs-recommendation-dashboard/backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Run migrations:
   ```bash
   python manage.py migrate
   ```

6. Start the server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and go to `http://localhost:5173`


## VI. API Endpoints

### Dataset Information
- `GET /api/datapropertise/`: Returns dataset properties and quality metrics
- `GET /api/recommender_datainfo/`: Returns recommendation model evaluation metrics

## **VII. Tech Stack & Dependencies**

| Layer           | Technologies          | Version     |
|------------------|------------------------|-------------|
| **Front-End**     | React                  | 19.1.0      |
|                  | React Router           | 6.26.2      |
|                  | CoreUI React           | 5.6.0       |
|                  | Tailwind CSS           | 3.4.14      |
| **Build Tool**    | Vite                   | 6.3.5       |
| **Visualization** | Chart.js               | 4.4.9       |
|                  | React-Chartjs-2        | 5.3.0       |
| **Back-End**      | Django                 | 3.2.25      |
|                  | Django REST Framework  | 3.12.4      |
| **Database**      | Djongo (MongoDB connector) | N/A     |
|                  | PyMongo                | 3.11.4      |
| **Environment**   | Python-dotenv          | 1.1.0       |


## VIII. Deployment Notes

- Developed and tested locally using Vite and Next.js.

- API architecture designed to be scalable with real user data.

- Future deployment compatible with: **Vercel**, **Netlify**, or any cloud hosting.

---

## IX. Contributors

* Leader: M.Sc. IT. Nguyễn Thị Anh Thư
* Members : Nguyễn Viết Kha \- Nguyễn Hoài Phương, Đỗ Thành Đạt - Vi Thị Hương

