from django.contrib import admin
from account.models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html

class UserModelAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'name', 'tc', 'is_admin', 'display_profile_pic', 'display_cover_pic', 'display_bio')
    list_filter = ('is_admin',)
    fieldsets = (
        ('User Credentials', {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'tc', 'bio', 'profile_pic', 'cover_pic')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'tc', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()

    def display_profile_pic(self, obj):
        if obj.profile_pic:
            return format_html('<img src="{}" style="width: 50px; height: 50px; border-radius: 50%;" />', obj.profile_pic.url)
        else:
            return format_html('<img src="path/to/default_profile_pic.jpg" style="width: 50px; height: 50px; border-radius: 50%;" />')

    display_profile_pic.short_description = 'Profile Picture'

    def display_cover_pic(self, obj):
        if obj.cover_pic:
            return format_html('<img src="{}" style="width: 100px; height: 100px;" />', obj.cover_pic.url)
        else:
            return format_html('<img src="path/to/default_cover_pic.jpg" style="width: 100px; height: 100px;" />')

    display_cover_pic.short_description = 'Cover Picture'

    def display_bio(self, obj):
        return obj.bio or 'No bio available'

    display_bio.short_description = 'Bio'

admin.site.register(User, UserModelAdmin)
