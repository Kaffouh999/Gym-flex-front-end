import {
    Component,
    forwardRef,
    OnInit,
    ViewChild,
} from "@angular/core";
import { NgControl } from "@angular/forms";
import { BarcodeFormat } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { ConfirmationService, MessageService } from "primeng/api";
import { OverlayPanel } from "primeng/overlaypanel";
import { SessionMember } from "src/app/core/models/SessionMember";
import { SessionService } from "../../services/session.service";

@Component({
    selector: "app-session",
    templateUrl: "./session.component.html",
    styleUrls: ["./session.component.scss"],
    providers: [
        MessageService,
        ConfirmationService,
        { provide: NgControl, useExisting: forwardRef(() => SessionComponent) },
    ],
})
export class SessionComponent implements OnInit {
    barcodeFormat: any = [];
    @ViewChild("scanner") scanner: ZXingScannerComponent | undefined =
        undefined;
    @ViewChild("op") overlayPanel: OverlayPanel;
    sessionMembers: SessionMember[] = [];

    constructor(
        private sessionService: SessionService,
        private messageService: MessageService
    ) {}
    ngOnInit(): void {
        this.getAllSessionMembers();
        this.barcodeFormat.push(BarcodeFormat.QR_CODE);
    }

    getAllSessionMembers() {
        this.sessionService.getAllSessionMembers().subscribe((data: any) => {
            this.sessionMembers = data;
            console.log(this.sessionMembers);
        });
    }

    startScanner(event: any) {
        // Start the scanner
        this.scanner.scanStart();
        this.overlayPanel.toggle(event);
    }

    stopScanner() {
        // Stop the scanner
        this.scanner?.scanStop();
    }

    onScanSuccess(resultString: string) {
        this.stopScanner();
        console.log("QR code scanned:", resultString);
        this.sessionService.canEnter(resultString).subscribe((res: any) => {
            if (res === 1) {
                this.getAllSessionMembers();
                this.sessionService.playWelcomAudio();
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "entering successfuly",
                    life: 3000,
                });
            } else if (res === 2) {
                this.getAllSessionMembers();
                this.sessionService.playGoodbyeAudio();
                this.messageService.add({
                    severity: "warn",
                    summary: "Successful",
                    detail: "leaving successfuly",
                    life: 3000,
                });
            } else {
                this.messageService.add({
                    severity: "error",
                    summary: "not Allowed",
                    detail: "not allowed to enter" + res,
                    life: 3000,
                });
            }
        });
        // Close the scanner after a successful scan

        setTimeout(() => {
            this.scanner.scanStart();
        }, 5000);
    }
}
