from djongo import models  # Sử dụng models từ djongo thay cho django.db

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE, related_name="notes")  # Chắc chắn rằng 'User' được tham chiếu đúng

    def __str__(self):
        return self.title


class TableProperty(models.Model):
    dataset_name = models.CharField(max_length=255, null=True, blank=True)
    File = models.CharField(max_length=255, null=True, blank=True)
    missing_value_rate = models.CharField(max_length=20, null=True, blank=True)
    num_rows = models.IntegerField(null=True, blank=True)
    num_column = models.IntegerField(null=True, blank=True)
    num_duplicates = models.IntegerField(null=True, blank=True)
    data_types = models.JSONField(null=True, blank=True)  # Đảm bảo sử dụng ListField cho dữ liệu dạng danh sách

    class Meta:
        db_table = "table_properties"
