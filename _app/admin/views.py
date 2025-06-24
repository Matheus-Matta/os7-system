from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render

@staff_member_required
def custom_dashboard_view(request):
    return render(request, "admin/dashboard.html")