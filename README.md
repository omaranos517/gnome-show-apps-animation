# Show Apps Scale Down Animation

إضافة GNOME Shell تضيف حركة `Scale Down` قصيرة عند الضغط على أي تطبيق من شاشة `Show Apps`.

## التثبيت

انسخ المجلد إلى:

```bash
~/.local/share/gnome-shell/extensions/scale-down-animation@omaranos.gmail.com
```

ثم فعّل الإضافة:

```bash
gnome-extensions enable scale-down-animation@omaranos.gmail.com
```

بعد ذلك أعد تحميل GNOME Shell أو سجّل الخروج ثم ادخل مرة أخرى.

## ملاحظات

- الإضافة مستهدفة حاليًا لـ `GNOME Shell 46`.
- التأثير يعمل عند استدعاء `activate()` لأيقونات التطبيقات من شاشة `Show Apps`.
