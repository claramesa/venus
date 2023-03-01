# Generated by Django 4.1.7 on 2023-02-17 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nif', models.CharField(max_length=8)),
                ('nombre', models.CharField(max_length=50)),
                ('fecha_nac', models.DateField()),
                ('correo', models.CharField(max_length=100)),
                ('telefono', models.IntegerField(max_length=9)),
                ('rol', models.CharField(choices=[('co', 'Cocinero'), ('ca', 'Camarero'), ('ba', 'Barra')], max_length=2)),
            ],
        ),
    ]
