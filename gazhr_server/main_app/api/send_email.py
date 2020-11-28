from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
import json

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def send_email():
    try:
        data = json.loads(request.body)
        msg = MIMEMultipart()
        msg['From'] = data["mail_address_from"]
        msg['To'] = data["mail_address_to"]
        msg['Subject'] = data["subject"]
        s = smtplib.SMTP(data["smtp_host"], data["smtp_port"])
        s.sendmail(
            data["mail_address_from"], data["mail_address_to"],
            msg.attach(MIMEText(data["message"]), 'html').as_string()
        )
        s.quit()
        return JsonResponse({"status": 200})
    except BaseException as e:
        return JsonResponse({"status": 404, "error": str(e)})
