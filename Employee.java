package com.adobe.aem.guides.wknd.core.models;

public class Employee {
    private String id;
    private String name;
    private String designation;
    private String department;

    // Getter for ID
    public String getId() {
        return id;
    }

    // Setter for ID
    public void setId(String id) {
        this.id = id;
    }

    // Getter for Name
    public String getName() {
        return name;
    }

    // Setter for Name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for Designation
    public String getDesignation() {
        return designation;
    }

    // Setter for Designation
    public void setDesignation(String designation) {
        this.designation = designation;
    }

    // Getter for Department
    public String getDepartment() {
        return department;
    }

    // Setter for Department
    public void setDepartment(String department) {
        this.department = department;
    }
}
