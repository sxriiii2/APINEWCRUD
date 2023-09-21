import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';




interface IssueCategory {
  id: number;
  title: string;
  color_code: string;
  status_id: number;
  status_label: string;
  status: string;
  created_by: number;
  created_by_first_name: string;
  created_by_last_name: string;
  created_by_designation: string;
  created_by_department: string;
  created_by_status: string;
  created_at: string;
  updated_by: number | null;
  updated_by_first_name: string | null;
  updated_by_last_name: string | null;
  updated_by_designation: string | null;
  updated_by_department: string | null;
  updated_by_status: string | null;
  updated_at: string;
}

@Component({
  selector: 'app-isorobo',
  templateUrl: './isorobo.component.html',
  styleUrls: ['./isorobo.component.css']
})

export class IsoroboComponent implements OnInit {
  newCategory: Partial<IssueCategory> = {
    title: '',
    color_code: ''
  };
  i: number = 1;
  deleteCategory: { id: number } = { id: 0 };
  updateCategory: IssueCategory = {
    id: 0,
    title: '',
    color_code: '',
    status_id: 0,
    status_label: '',
    status: '',
    created_by: 0,
    created_by_first_name: '',
    created_by_last_name: '',
    created_by_designation: '',
    created_by_department: '',
    created_by_status: '',
    created_at: '',
    updated_by: null,
    updated_by_first_name: null,
    updated_by_last_name: null,
    updated_by_designation: null,
    updated_by_department: null,
    updated_by_status: null,
    updated_at: ''
  };
  isAddMode = true; // Add mode by default


  updateCategoryForm!: FormGroup; // Initialize in ngOnInit
  selectedCategory: IssueCategory | null = null; // Initialize in ngOnInit

  getJsonValue: IssueCategory[] = [];
  apiUrlBase = 'https://v2-dev-api.isorobot.io/api/v1/issue-categories';
  token = ''; // Replace with your API token

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {}

  

  ngOnInit(): void {
    this.loadData();
    this.updateCategoryForm = this.formBuilder.group({
      title: ['', Validators.required],
      color_code: ['', Validators.required]
    });
  }

  loadData(): void {
    const apiUrl = `${this.apiUrlBase}?page=${this.i}`;
    
    this.http.get(apiUrl ).subscribe(
      (data: any) => {
        console.log('API Response:', data);

        if (data && data.data) {
          this.getJsonValue = data.data;
        } else {
          console.error('Invalid API response format.');
        }
      },
    );
  }

  onAddCategory(): void {
    if (!this.newCategory.title || !this.newCategory.color_code) {
      console.error('Title and color code are required.');
      return;
    }
  
    const newCategoryData: Partial<IssueCategory> = {
      title: this.newCategory.title,
      color_code: this.newCategory.color_code
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });
  
    const httpOptions = {
      headers: headers
    };
    
  
    this.http.post(this.apiUrlBase, newCategoryData, httpOptions).subscribe(
      (response: any) => {
        console.log('API Response:', response);
  
        if (response && response.data) {
          this.getJsonValue.push(response.data);
          this.newCategory.title = '';
          this.newCategory.color_code = '';
        } else {
          console.error('Invalid API response format.');
        }
      },
      (error) => {
        if (error.status === 422) {
          console.error('Validation Error:', error.error.message);
        } else {
          console.error('Error:', error);
        }
      }
    );
  }
  
  nextPage(): void {
    this.i++;
    this.loadData();
  }

  previousPage(): void {
    if (this.i > 1) {
      this.i--;
      this.loadData();
    }
  }

  // ...

// Update the onDeleteCategory method
onDeleteCategory(): void {
  if (this.deleteCategory.id === 0) {
    console.error('No category selected for delete.');
    return;
  }

  // Create the URL for the specific category you want to delete
  const deleteUrl = `${this.apiUrlBase}/${this.deleteCategory.id}`;

  // Set up the HTTP headers
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
  });

  const httpOptions = {
    headers: headers
  };

  // Send a DELETE request to delete the category
  this.http.delete(deleteUrl, httpOptions).subscribe(
    () => {
      console.log('Deleted issue category with ID:', this.deleteCategory.id);

      // Remove the deleted category from your local data
      this.getJsonValue = this.getJsonValue.filter(
        (category) => category.id !== this.deleteCategory.id
      );

      // Clear the selected category
      this.deleteCategory.id = 0;
    },
    (error) => {
      console.error('Error deleting category:', error);
    }
  );
}

// Update the onUpdateCategory method
onUpdateCategory(): void {
  if (this.isAddMode) {
    // Add category logic here
    const newCategoryData: Partial<IssueCategory> = {
      title: this.updateCategoryForm.value.title,
      color_code: this.updateCategoryForm.value.color_code
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    const httpOptions = {
      headers: headers
    };

    this.http.post(this.apiUrlBase, newCategoryData, httpOptions).subscribe(
      (response: any) => {
        console.log('API Response:', response);

        if (response && response.data) {
          this.getJsonValue.push(response.data);
          this.updateCategoryForm.reset();
        } else {
          console.error('Invalid API response format.');
        }
      },
    );
  } else {
    // Update category logic here
    if (!this.selectedCategory) {
      console.error('No category selected for update.');
      return;
    }

    const updatedData: Partial<IssueCategory> = {
      title: this.updateCategoryForm.value.title,
      color_code: this.updateCategoryForm.value.color_code
    };

    const updateUrl = `${this.apiUrlBase}/${this.selectedCategory.id}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    const httpOptions = {
      headers: headers
    };

    this.http.put(updateUrl, updatedData, httpOptions).subscribe(
      (response: any) => {
        console.log('Updated issue category:', response);

        const updatedCategoryIndex = this.getJsonValue.findIndex(
          (category) => category.id === this.selectedCategory!.id
        );

        if (updatedCategoryIndex !== -1) {
          this.getJsonValue[updatedCategoryIndex] = response.data;
        }

        this.updateCategoryForm.reset();
        this.selectedCategory = null;
        this.isAddMode = true; // Switch back to "Add" mode after update
      },
      (error) => {
        console.error('Error updating category:', error);
      }
    );
  }
}
selectCategoryForUpdate(category: IssueCategory): void {
  this.isAddMode = false; // Set to false to switch to "Update" mode
  this.selectedCategory = category;
  this.updateCategoryForm.patchValue({
    title: category.title,
    color_code: category.color_code
  });
}
}